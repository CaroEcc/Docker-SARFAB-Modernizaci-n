using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.VolunteerEntity;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel
{
    public class VolunteerRepository : IVolunteerRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly ILoggingService _loggingService;

        public VolunteerRepository(SARFABSystemDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }

        public async Task<int> CreateVolunteerAsync(VolunteerEntity volunteer, int volunteerGradeId, MedicalCheckupEntity medicalCheckupEntity)
        {
            try
            {
                var personModel = new Person
                {
                    FirstName = volunteer.Person.FirstName,
                    LastName = volunteer.Person.LastName
                };
                _context.People.Add(personModel);
                await _context.SaveChangesAsync();

                var volunteerModel = new Volunteer
                {
                    VolunteerId = personModel.PersonId,
                    HomeAddress = volunteer.HomeAddress,
                    Ci = volunteer.Ci,
                    BirthDate = volunteer.BirthDate,
                    Phone = volunteer.Phone,
                    MobilePhone = volunteer.MobilePhone,
                    Email = volunteer.Email,
                    DistinctiveFeatures = volunteer.DistinctiveFeatures,
                    VolunteerType = volunteer.VolunteerType,
                    Occupation = volunteer.Occupation,
                    BloodType = volunteer.BloodType,
                    Religion = volunteer.Religion,
                    Allergies = volunteer.Allergies,
                    EmergencyContactFullName = volunteer.EmergencyContactFullName,
                    EmergencyContactRelation = volunteer.EmergencyContactRelation,
                    EmergencyContactAddress = volunteer.EmergencyContactAddress,
                    EmergencyContactPhone = volunteer.EmergencyContactPhone,
                    EmergencyContactMobile = volunteer.EmergencyContactMobile,
                    DepartmentId = volunteer.DepartmentId,
                    Status = (sbyte)volunteer.Status,
                    UserId = volunteer.UserId
                };
                _context.Volunteers.Add(volunteerModel);
                await _context.SaveChangesAsync();

                var gradeAssignment = new VolunteerGrade
                {
                    VolunteerId = volunteerModel.VolunteerId,
                    GradeId = volunteerGradeId,
                    UserId = volunteer.UserId
                };
                _context.VolunteerGrades.Add(gradeAssignment);
                await _context.SaveChangesAsync();

                var checkupModel = new MedicalCheckup
                {
                    VolunteerId = volunteerModel.VolunteerId,
                    CheckupDate = medicalCheckupEntity.CheckupDate,
                    ExpirationDate = medicalCheckupEntity.ExpirationDate,
                    Observations = medicalCheckupEntity.Observations,
                    UserId = medicalCheckupEntity.UserId
                };
                _context.MedicalCheckups.Add(checkupModel);
                await _context.SaveChangesAsync();

                return volunteerModel.VolunteerId;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL REGISTRAR VOLUNTARIO: {ex.Message}");
                throw;
            }
        }

        public async Task<(IEnumerable<(VolunteerEntity Volunteer, string GradeName)> Data, int TotalPages)> GetActiveVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Volunteers
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade).ThenInclude(vg => vg.Grade)
                .Where(v => v.Status == (sbyte)VolunteerEntity.VolunteerStatus.Active)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(v => v.VolunteerNavigation.FirstName.Contains(searchTerm) ||
                                         v.VolunteerNavigation.LastName.Contains(searchTerm) ||
                                         v.Ci.Contains(searchTerm));

            if (gradeId.HasValue)
                query = query.Where(v => v.VolunteerGrade != null && v.VolunteerGrade.GradeId == gradeId.Value);

            query = orderByLastNameAsc
                ? query.OrderBy(v => v.VolunteerNavigation.LastName).ThenBy(v => v.VolunteerNavigation.FirstName)
                : query.OrderByDescending(v => v.VolunteerNavigation.LastName).ThenByDescending(v => v.VolunteerNavigation.FirstName);

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var models = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return (models.Select(v => (
                new VolunteerEntity(v.VolunteerId, 
                    new PersonEntity(v.VolunteerNavigation.FirstName, v.VolunteerNavigation.LastName), 
                    v.Ci, v.MobilePhone, v.Email),
                v.VolunteerGrade?.Grade?.Name ?? "Sin Grado"
            )), totalPages);
        }
        
        public async Task<(VolunteerEntity Volunteer, string GradeName, string DepartmentName)> GetVolunteerByIdAsync(int id)
        {
            var model = await _context.Volunteers
                .Include(v => v.VolunteerNavigation) 
                .Include(v => v.VolunteerGrade)
                    .ThenInclude(vg => vg.Grade)     
                .Include(v => v.Department)
                .FirstOrDefaultAsync(v => v.VolunteerId == id);

            if (model == null)
                throw new BusinessException("Voluntario no encontrado");

            var personEF = model.VolunteerNavigation;
            var personEntity = new PersonEntity(personEF.PersonId, personEF.FirstName, personEF.LastName);

            var volunteerEntity = new VolunteerEntity(
                model.VolunteerId,
                personEntity,
                model.HomeAddress,
                model.Ci,
                model.BirthDate,
                model.Phone,
                model.MobilePhone,
                model.Email,
                model.Occupation,
                model.Religion,
                model.Allergies,
                model.BloodType,
                model.DistinctiveFeatures,
                model.VolunteerType,
                model.EmergencyContactFullName,
                model.EmergencyContactRelation,
                model.EmergencyContactAddress,
                model.EmergencyContactPhone,
                model.EmergencyContactMobile
            );

            var gradeName = model.VolunteerGrade?.Grade?.Name ?? "Sin Grado";
            var departmentName = model.Department?.Name ?? "Sin Departamento";

            return (volunteerEntity, gradeName, departmentName);
        }

        public async Task UpdateVolunteerAsync(VolunteerEntity entity, int? gradeId)
        {
            var model = await _context.Volunteers
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade)
                .FirstOrDefaultAsync(v => v.VolunteerId == entity.VolunteerId);

            if (model == null)
                return;
            model.VolunteerNavigation.FirstName = entity.Person.FirstName;
            model.VolunteerNavigation.LastName = entity.Person.LastName;
            model.HomeAddress = entity.HomeAddress; 
            model.Ci = entity.Ci;
            model.BirthDate = entity.BirthDate;
            model.Phone = entity.Phone;
            model.MobilePhone = entity.MobilePhone;
            model.Email = entity.Email;
            model.DistinctiveFeatures = entity.DistinctiveFeatures;
            model.VolunteerType = entity.VolunteerType;
            model.Occupation = entity.Occupation;
            model.BloodType = entity.BloodType;
            model.Religion = entity.Religion;
            model.Allergies = entity.Allergies;
            model.EmergencyContactFullName = entity.EmergencyContactFullName;
            model.EmergencyContactRelation = entity.EmergencyContactRelation;
            model.EmergencyContactAddress = entity.EmergencyContactAddress;
            model.EmergencyContactPhone = entity.EmergencyContactPhone;
            model.EmergencyContactMobile = entity.EmergencyContactMobile;

            if (entity.DepartmentId.HasValue)
                model.DepartmentId = entity.DepartmentId.Value;
            
            if (gradeId.HasValue && gradeId > 0)
            {
                if (model.VolunteerGrade != null)
                    model.VolunteerGrade.GradeId = gradeId.Value;
                else
                    model.VolunteerGrade = new VolunteerGrade { VolunteerId = model.VolunteerId, GradeId = gradeId.Value, UserId = entity.UserId };
            }
            _context.Entry(model).State = EntityState.Modified;
            _context.Entry(model.VolunteerNavigation).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task<(IEnumerable<(VolunteerEntity Volunteer, string GradeName)> Data, int TotalPages)> GetHistoricalListVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            VolunteerStatus? status = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Volunteers
                .Where(v => v.Status == (sbyte)VolunteerStatus.Deleted || v.Status == (sbyte)VolunteerStatus.ServiceCompleted)
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade)
                    .ThenInclude(vg => vg.Grade)
                .AsQueryable();
            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(v => v.VolunteerNavigation.FirstName.Contains(searchTerm) ||
                                         v.VolunteerNavigation.LastName.Contains(searchTerm));
            if (gradeId.HasValue)
                query = query.Where(v => v.VolunteerGrade != null && v.VolunteerGrade.GradeId == gradeId.Value);
            if (status.HasValue)
                query = query.Where(v => v.Status == (sbyte)status.Value);
            if (startDate.HasValue)
                query = query.Where(v => v.UpdatedAt >= startDate.Value.Date);
            if (endDate.HasValue)
                query = query.Where(v => v.UpdatedAt <= endDate.Value.Date.AddDays(1).AddSeconds(-1));
            query = query.OrderByDescending(v => v.UpdatedAt);
            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);
            var models = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (models.Select(v =>
            {
                var personEF = v.VolunteerNavigation;
                var personEntity = new PersonEntity(personEF.FirstName, personEF.LastName);
                var volunteerEntity = new VolunteerEntity(
                    v.VolunteerId,
                    personEntity,
                    DateOnly.FromDateTime((DateTime)v.UpdatedAt),
                    v.DischargeReason,
                    (VolunteerStatus)v.Status
                );
                var gradeName = v.VolunteerGrade?.Grade?.Name ?? "Sin Grado";
                return (volunteerEntity, gradeName);
            }), totalPages);
        }
        
        public async Task UpdateStatusAsync(VolunteerEntity entity)
        {
            try
            {
                var model = await _context.Volunteers
                    .FirstOrDefaultAsync(v => v.VolunteerId == entity.VolunteerId);
                if (model == null)
                    throw new BusinessException("Voluntario no encontrado");

                model.Status = (sbyte)entity.Status;

                if (entity.Status != VolunteerStatus.Active)
                {
                    model.DischargeReason = entity.DischargeReason;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL ACTUALIZAR ESTADO DE VOLUNTARIO: {ex.Message}");
                throw;
            }
        }
        
        public async Task<IEnumerable<RankGradeDTO>> GetAllGradesAsync()
        {
            var grades = await _context.Grades.ToListAsync();
            return grades.Select(g => new RankGradeDTO
            {
                Id = g.GradeId,
                Name = g.Name
            });
        }
        public async Task<string?> GetVolunteerTypeByIdAsync(int volunteerId)
        {
            return await _context.Volunteers
                .Where(v => v.VolunteerId == volunteerId)
                .Select(v => v.VolunteerType)
                .FirstOrDefaultAsync();
        }
        
        public async Task<(string FullName, string GradeName)?> GetFullNameAndGradeByIdAsync(int volunteerId)
        {
            var volunteer = await _context.Volunteers
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade)
                .ThenInclude(vg => vg.Grade)
                .FirstOrDefaultAsync(v => v.VolunteerId == volunteerId);

            if (volunteer == null || volunteer.VolunteerNavigation == null)
                return null;

            var fullName = $"{volunteer.VolunteerNavigation.LastName} {volunteer.VolunteerNavigation.FirstName}";
            var gradeName = volunteer.VolunteerGrade?.Grade?.Name ?? "Sin Grado";

            return (fullName, gradeName);
        }
    }
}
