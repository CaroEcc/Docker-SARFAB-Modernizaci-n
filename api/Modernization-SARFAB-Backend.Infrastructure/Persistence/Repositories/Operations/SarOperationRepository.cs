using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;
using AutoMapper;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations
{
    public class SarOperationRepository : ISarOperationRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly ILoggingService _loggingService;
        private readonly IMapper _mapper;

        public SarOperationRepository(SARFABSystemDbContext context, ILoggingService loggingService, IMapper mapper)
        {
            _context = context;
            _loggingService = loggingService;
            _mapper = mapper;
        }

        public async Task<int> CreateSarOperationAsync(
            SarOperationEntity sarOperation,
            OperationPersonDTO responsible,
            IEnumerable<OperationPersonDTO> personnel)
        {
            var sarOperationModel = new SarOperation
            {
                Address = sarOperation.Address,
                DepartureDate = sarOperation.DepartureDate,
                ArrivalDate = sarOperation.ArrivalDate,
                OperationTypeId = sarOperation.OperationTypeId,
                MunicipalityId = sarOperation.MunicipalityId,
                RequesterId = sarOperation.RequesterId,
                Status = (sbyte)sarOperation.Status,
                UserId = sarOperation.UserId
            };

            _context.SarOperations.Add(sarOperationModel);
            await _context.SaveChangesAsync();

            _context.PersonOperations.Add(new PersonOperation
            {
                OperationId = sarOperationModel.OperationId,
                PersonId = responsible.PersonId,
                Role = responsible.Role,
                UserId = sarOperation.UserId,
                CreatedAt = DateTime.Now
            });

            foreach (var person in personnel)
            {
                _context.PersonOperations.Add(new PersonOperation
                {
                    OperationId = sarOperationModel.OperationId,
                    PersonId = person.PersonId,
                    Role = person.Role,
                    UserId = sarOperation.UserId,
                    CreatedAt = DateTime.Now
                });
            }
            await _context.SaveChangesAsync();
            return sarOperationModel.OperationId;
        }
        
        public async Task UpdateOperationDetailsAsync(SarOperationEntity updatedOperation, short userId)
        {
            var modelSarOperation = await _context.SarOperations.FindAsync(updatedOperation.OperationId);
            modelSarOperation.Address = updatedOperation.Address;
            modelSarOperation.DepartureDate = updatedOperation.DepartureDate;
            modelSarOperation.ArrivalDate = updatedOperation.ArrivalDate;
            modelSarOperation.OperationTypeId = updatedOperation.OperationTypeId;
            modelSarOperation.MunicipalityId = updatedOperation.MunicipalityId;
            modelSarOperation.Observations = updatedOperation.Observations;
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateResponsibleAsync(int operationId, MilitaryEntity newResponsible, short userId)
        {
            var existingResponsible = await _context.PersonOperations
                .FirstOrDefaultAsync(r => r.OperationId == operationId && r.Role.ToLower() == "responsable");

            if (existingResponsible != null && existingResponsible.PersonId != newResponsible.PersonId)
            {
                _context.PersonOperations.Remove(existingResponsible);
            }

            if (existingResponsible == null || existingResponsible.PersonId != newResponsible.PersonId)
            {
                var newResponsibleRecord = new PersonOperation
                {
                    OperationId = operationId,
                    PersonId = newResponsible.PersonId,
                    Role = "Responsable",
                    UserId = userId,
                    CreatedAt = DateTime.Now
                };
                _context.PersonOperations.Add(newResponsibleRecord);
            }

            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateAssignedPersonnelAsync(int operationId, List<MilitaryEntity> militaryPersonnel, List<VolunteerEntity> volunteerPersonnel, short userId)
        {
            var existingPersonnel = await _context.PersonOperations
                .Where(r => r.OperationId == operationId && r.Role.ToLower() != "responsable")
                .ToListAsync();

            foreach (var record in existingPersonnel)
            {
                if (!militaryPersonnel.Any(m => m.PersonId == record.PersonId) &&
                    !volunteerPersonnel.Any(v => v.PersonId == record.PersonId))
                {
                    _context.PersonOperations.Remove(record);
                }
            }

            foreach (var military in militaryPersonnel)
            {
                if (!existingPersonnel.Any(ep => ep.PersonId == military.PersonId))
                {
                    var newRecord = new PersonOperation
                    {
                        OperationId = operationId,
                        PersonId = military.PersonId,
                        Role = "Personal Militar",
                        UserId = userId,
                        CreatedAt = DateTime.Now
                    };
                    _context.PersonOperations.Add(newRecord);
                }
            }

            foreach (var volunteer in volunteerPersonnel)
            {
                if (!existingPersonnel.Any(ep => ep.PersonId == volunteer.PersonId))
                {
                    var newRecord = new PersonOperation
                    {
                        OperationId = operationId,
                        PersonId = volunteer.PersonId,
                        Role = "Voluntario",
                        UserId = userId,
                        CreatedAt = DateTime.Now
                    };
                    _context.PersonOperations.Add(newRecord);
                }
            }
            await _context.SaveChangesAsync();
        }
        
        public async Task<(IEnumerable<ActiveOperationDTO> Data, int TotalPages)> GetActiveOperationsAsync(
            string searchTerm = null,
            int? status = (int)SarOperationEntity.OperationStatus.Active,
            int? municipalityId = null,
            int? categoryId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.SarOperations
                .Include(o => o.Requester)
                .Include(o => o.OperationType)
                    .ThenInclude(ot => ot.OperationCategory)
                .Include(o => o.Municipality)
                .Include(o => o.PersonOperations)
                    .ThenInclude(po => po.Person)
                .Where(o => o.Status == status);

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(o =>
                    o.Address.Contains(searchTerm) ||
                    o.Requester.Name.Contains(searchTerm) ||
                    o.PersonOperations.Any(po =>
                        (po.Person.FirstName.Contains(searchTerm) || po.Person.LastName.Contains(searchTerm)) &&
                        po.Role == "Responsable"));
            }

            if (municipalityId.HasValue)
                query = query.Where(o => o.MunicipalityId == municipalityId);

            if (categoryId.HasValue)
                query = query.Where(o => o.OperationType.OperationCategoryId == categoryId);

            if (startDate.HasValue && endDate.HasValue)
            {
                var startDateValue = startDate.Value.Date;
                var endDateValue = endDate.Value.Date.AddDays(1).AddSeconds(-1);
                query = query.Where(o => o.DepartureDate >= startDateValue && o.DepartureDate <= endDateValue);
            }

            query = query.OrderByDescending(o => o.CreatedAt);

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var operations = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new ActiveOperationDTO
                {
                    OperationId = o.OperationId,
                    MunicipalityName = o.Municipality.Name,
                    Address = o.Address,
                    RequesterName = o.Requester.Name,
                    CategoryAndOperationType = o.OperationType.OperationCategory.Name + " - " + o.OperationType.Name,
                    DepartureDate = o.DepartureDate,
                    ArrivalDate = o.ArrivalDate,
                    Responsible = o.PersonOperations
                        .Where(po => po.Role == "Responsable")
                        .Select(po => po.Person.Military.MilitaryRankAssignment.Rank.Abbreviation + " " + po.Person.LastName + " " + po.Person.FirstName)
                        .FirstOrDefault(),
                    Status = (int)o.Status
                })
                .ToListAsync();

            return (operations, totalPages);
        }
        
        public async Task UpdateOperationStatusAsync(SarOperationEntity entity)
        {
            var model = await _context.SarOperations.FindAsync(entity.OperationId);
            if (model == null) return;

            model.Status = (sbyte)entity.Status;

            if (entity.Status == 0) 
            {
                model.Observations = entity.Observations;
            }

            await _context.SaveChangesAsync();
        }
        
        public async Task<SarOperationDetailDTO> GetOperationByIdAsync(int operationId)
        {
            return await _context.SarOperations
                .Where(o => o.OperationId == operationId)
                .Select(o => new SarOperationDetailDTO
                {
                    OperationId = o.OperationId,
                    OperationTypeName = o.OperationType.Name,
                    CategoryName = o.OperationType.OperationCategory.Name,
                    DepartmentName = o.Municipality.Province.Department.Name,
                    MunicipalityName = o.Municipality.Name,
                    ProvinceName = o.Municipality.Province.Name,
                    Address = o.Address,
                    DepartureDate = o.DepartureDate,
                    ArrivalDate = o.ArrivalDate,
                    Observations = o.Observations,
                    OperationStatus = o.Status == 1 ? "Activa" : "Finalizada",
                    RequesterName = o.Requester.Name,
                    RequesterPhone = o.Requester.Phone,
                    RequesterMobile = o.Requester.MobilePhone,
                    RequesterId = o.Requester.RequesterId,
                    OperationTypeId = o.OperationTypeId,
                    MunicipalityId = o.MunicipalityId
                })
                .FirstOrDefaultAsync();
        }
        public async Task<OperationPersonnelDTO> GetResponsibleByOperationIdAsync(int operationId)
        {
            return await _context.PersonOperations
                .Where(po => po.OperationId == operationId && po.Role == "Responsable")
                .Select(po => new OperationPersonnelDTO
                {
                    PersonId = po.PersonId,
                    FullName = po.Person.Military.MilitaryNavigation.LastName + " " + po.Person.Military.MilitaryNavigation.FirstName,
                    RankOrGrade = po.Person.Military.MilitaryRankAssignment.Rank.Name
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<OperationPersonnelDTO>> GetPersonnelByOperationIdAsync(int operationId)
        {
            return await _context.PersonOperations
                .Where(po => po.OperationId == operationId && po.Role != "Responsable")
                .OrderByDescending(po => po.Person.Military != null)
                .Select(po => new OperationPersonnelDTO
                {
                    PersonId = po.PersonId,
                    FullName = po.Person.Military != null
                        ? po.Person.Military.MilitaryNavigation.LastName + " " + po.Person.Military.MilitaryNavigation.FirstName
                        : po.Person.Volunteer.VolunteerNavigation.LastName + " " + po.Person.Volunteer.VolunteerNavigation.FirstName,
                    RankOrGrade = po.Person.Military != null
                        ? po.Person.Military.MilitaryRankAssignment.Rank.Name
                        : po.Person.Volunteer.VolunteerGrade.Grade.Name
                })
                .ToListAsync();
        }

        public async Task<AbsenceMarkingDTO?> GetOperationAbsenceMarkingAsync(int operationId)
        {
            return await _context.SarOperations
                .Where(o => o.OperationId == operationId)
                .Select(o => new AbsenceMarkingDTO()
                {
                    Activity = o.OperationType.OperationCategory.Name + " - " + o.OperationType.Name,
                    DepartmentName = o.Municipality.Province.Department.Name,
                    MunicipalityName = o.Municipality.Name,
                    ProvinceName = o.Municipality.Province.Name,
                    DepartureDate = o.DepartureDate,
                    ArrivalDate = o.ArrivalDate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<OperationPersonnelDTO>> GetOperationVolunteersAbsenceMarkingAsync(int operationId)
        {
            return await _context.PersonOperations
                .Where(po => po.OperationId == operationId && po.Person.Military == null)
                .OrderBy(po => po.Person.LastName)
                .Select(po => new OperationPersonnelDTO
                {
                    PersonId = po.Person.Volunteer.VolunteerId,
                    FullName = po.Person.LastName + " " + po.Person.FirstName,
                    RankOrGrade = po.Person.Volunteer.VolunteerGrade.Grade.Name,
                    Status = po.Status
                })
                .ToListAsync();
        }
        
        public async Task<SarOperationEntity> GetOperationEntityByIdAsync(int operationId)
        {
            var operation = await _context.SarOperations
                .FirstOrDefaultAsync(o => o.OperationId == operationId);

            if (operation == null)
                return null;

            return new SarOperationEntity(
                operation.Address,
                operation.DepartureDate,
                operation.OperationTypeId,
                operation.MunicipalityId,
                operation.RequesterId,
                operation.ArrivalDate
            );
        }

        public async Task<int> CreateRequesterAsync(CreateRequesterDTO requester)
        {
            var requesterModel = new Requester
            {
                Name = requester.RequesterName,
                Phone = requester.RequesterPhone,
                MobilePhone = requester.RequesterMobilePhone,
            };

            _context.Requesters.Add(requesterModel);
            await _context.SaveChangesAsync();

            return requesterModel.RequesterId;
        }

        public async Task UpdateRequesterAsync(int requesterId, CreateRequesterDTO requester)
        {
            var requesterModel = await _context.Requesters.FindAsync(requesterId);
            if (requesterModel == null) return;

            requesterModel.Name = requester.RequesterName;
            requesterModel.Phone = requester.RequesterPhone;
            requesterModel.MobilePhone = requester.RequesterMobilePhone;

            await _context.SaveChangesAsync();
            
        }

        public async Task UpdatePersonOperationAsync(PersonOperationEntity personOperation)
        {
            var model = await _context.PersonOperations
                .FirstOrDefaultAsync(po => po.OperationId == personOperation.OperationId &&
                                           po.PersonId == personOperation.PersonId);
            if (model == null)
            {
                Console.WriteLine("No se encontró el registro de la persona en la operación");
            }
            
            model.Status = personOperation.Status;
            await _context.SaveChangesAsync();
        }
    }
}
