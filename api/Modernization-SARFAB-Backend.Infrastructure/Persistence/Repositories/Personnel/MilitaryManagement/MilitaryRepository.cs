using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.MilitaryManagement
{
    public class MilitaryRepository : IMilitaryRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly ILoggingService _loggingService;

        public MilitaryRepository(SARFABSystemDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }
        
        public async Task<int> CreateMilitaryAsync(MilitaryEntity entity, int militaryRankId)
        {
            try
            {
                var personModel = new Person
                {
                    FirstName = entity.Person.FirstName,
                    LastName = entity.Person.LastName
                };
                _context.People.Add(personModel);
                await _context.SaveChangesAsync();

                var militaryModel = new Military
                {
                    MilitaryId = personModel.PersonId,
                    MobilePhone = entity.MobilePhone,
                    UserId = entity.UserId
                };

                await _context.Militaries.AddAsync(militaryModel);
                await _context.SaveChangesAsync();

                var rankAssignment = new MilitaryRankAssignment
                {
                    MilitaryId = militaryModel.MilitaryId,
                    RankId = militaryRankId,
                    UserId = entity.UserId
                };

                await _context.MilitaryRankAssignments.AddAsync(rankAssignment);
                await _context.SaveChangesAsync();

                return militaryModel.MilitaryId;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL CREAR MILITAR Y ASIGNAR RANGO: {ex.Message}");
                throw;
            }
        }
        
        public async Task<(IEnumerable<(MilitaryEntity Military, string RankName)> Data, int TotalPages)> GetActiveMilitaryAsync(
        string searchTerm = null,
        MilitaryEntity.MilitaryStatus? status = MilitaryEntity.MilitaryStatus.Active,
        int? rankId = null,
        bool orderByLastNameAsc = true,
        int page = 1,
        int pageSize = 10)
        {
            var query = _context.Militaries
                .Include(m => m.MilitaryNavigation)
                .Include(m => m.MilitaryRankAssignment)
                    .ThenInclude(mr => mr.Rank)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(m => m.MilitaryNavigation.FirstName.Contains(searchTerm) || m.MilitaryNavigation.LastName.Contains(searchTerm));

            if (status.HasValue)
                query = query.Where(m => m.Status == (sbyte)status.Value);

            if (rankId.HasValue)
                query = query.Where(m => m.MilitaryRankAssignment != null && m.MilitaryRankAssignment.RankId == rankId.Value);

            query = orderByLastNameAsc
                ? query.OrderBy(m => m.MilitaryNavigation.LastName).ThenBy(m => m.MilitaryNavigation.FirstName)
                : query.OrderByDescending(m => m.MilitaryNavigation.LastName).ThenByDescending(m => m.MilitaryNavigation.FirstName);

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var data = (await query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync())
                .Select(m => (
                    new MilitaryEntity(
                        m.MilitaryId,
                        new PersonEntity(m.MilitaryNavigation.PersonId, m.MilitaryNavigation.FirstName, m.MilitaryNavigation.LastName, m.MilitaryNavigation.UserId ?? 0),
                        m.MobilePhone,
                        m.UserId,
                        m.Status.HasValue ? (MilitaryEntity.MilitaryStatus)m.Status.Value : MilitaryEntity.MilitaryStatus.Active
                    ),
                    m.MilitaryRankAssignment != null ? m.MilitaryRankAssignment.Rank.Name : "Sin Rango"
                ));

            return (data, totalPages);
        }

        
        public async Task<(MilitaryEntity Military, string RankName)> GetMilitaryByIdAsync(int id)
        {
            var model = await _context.Militaries
                .Include(m => m.MilitaryNavigation)
                .Include(m => m.MilitaryRankAssignment)
                    .ThenInclude(mr => mr.Rank)
                .FirstOrDefaultAsync(m => m.MilitaryId == id);

            if (model == null)
                throw new BusinessException("Militar no encontrado");

            var personEF = model.MilitaryNavigation;
            var personEntity = new PersonEntity(personEF.PersonId, personEF.FirstName, personEF.LastName, personEF.UserId ?? 0);

            var militaryEntity = new MilitaryEntity(model.MilitaryId, personEntity, model.MobilePhone, model.UserId,
                model.Status.HasValue ? (MilitaryEntity.MilitaryStatus)model.Status.Value : MilitaryEntity.MilitaryStatus.Active);

            var rankName = model.MilitaryRankAssignment?.Rank.Name ?? "Sin Rango";

            return (militaryEntity, rankName);
        }

        public async Task UpdateAsync(MilitaryEntity entity, int? militaryRankId)
        {
            try
            {
                var model = await _context.Militaries
                    .Include(m => m.MilitaryNavigation)
                    .Include(m => m.MilitaryRankAssignment)
                    .FirstOrDefaultAsync(m => m.MilitaryId == entity.Id);

                if (model == null)
                    throw new BusinessException("Militar no encontrado");

                if (entity.MobilePhone != null)
                    model.MobilePhone = entity.MobilePhone;

                if (model.MilitaryNavigation != null)
                {
                    if (!string.IsNullOrWhiteSpace(entity.Person.FirstName))
                        model.MilitaryNavigation.FirstName = entity.Person.FirstName;

                    if (!string.IsNullOrWhiteSpace(entity.Person.LastName))
                        model.MilitaryNavigation.LastName = entity.Person.LastName;
                }

                if (militaryRankId.HasValue && militaryRankId > 0)
                {
                    var rankExists = await _context.MilitaryRanks.AnyAsync(r => r.RankId == militaryRankId);
                    if (!rankExists)
                        throw new BusinessException("El rango especificado no existe");

                    if (model.MilitaryRankAssignment != null)
                    {
                        model.MilitaryRankAssignment.RankId = militaryRankId.Value;
                    }
                    else
                    {
                        model.MilitaryRankAssignment = new MilitaryRankAssignment
                        {
                            MilitaryId = model.MilitaryId,
                            RankId = militaryRankId.Value,
                            UserId = entity.UserId
                        };
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL ACTUALIZAR MILITARY: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateStatusAsync(MilitaryEntity entity)
        {
            var model = await _context.Militaries.FindAsync(entity.Id);
            if (model == null)
                throw new BusinessException("Militar no encontrado");
            model.Status = (sbyte)entity.Status;
            await _context.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<RankGradeDTO>> GetAllRanksAsync()
        {
            return await _context.MilitaryRanks
                .Select(r => new RankGradeDTO
                {
                    Id = r.RankId,
                    Name = r.Name
                })
                .ToListAsync();
        }
    }
}
