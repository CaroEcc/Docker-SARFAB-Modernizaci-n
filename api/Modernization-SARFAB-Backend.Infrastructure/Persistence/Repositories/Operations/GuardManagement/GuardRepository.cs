using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations.GuardManagement
{
    public class GuardRepository : IGuardRepository
    {
        private readonly SARFABSystemDbContext _context;
        public GuardRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }

        public async Task<GuardDTO> GetGuardByIdAsync(int id)
        {
            var guardModel = await _context.Guards
                .Include(g => g.Shift)
                .FirstOrDefaultAsync(v => v.GuardId == id);

            if (guardModel == null) throw new BusinessException("Guardia no encontrada");

            var responsibleModel = await _context.VolunteerGuards
                .Include(g => g.Volunteer)
                    .ThenInclude(v => v.VolunteerNavigation)
                .Include(g => g.Volunteer)
                    .ThenInclude(v => v.VolunteerGrade)
                    .ThenInclude(g => g.Grade)
                .FirstOrDefaultAsync(g => g.GuardId == id && g.Role == "Responsable");

            var voluntareeGuardModel = await _context.VolunteerGuards
                .Include(g => g.Volunteer)
                    .ThenInclude(v => v.VolunteerNavigation)
                .Include(g => g.Volunteer)
                    .ThenInclude(v => v.VolunteerGrade)
                    .ThenInclude(g => g.Grade)
                .Where(g => g.GuardId == id && g.Role == "Voluntario")
                .ToListAsync();


            var voluntareeGuardDTO = voluntareeGuardModel
                .Where(v => v.Volunteer != null)
                .Select(v => new VoluntareeGuardDTO
                {
                    VoluntareeId = v.VolunteerId,
                    VoluntareeFullname = $"{v.Volunteer.VolunteerNavigation?.LastName ?? "N/A"} {v.Volunteer.VolunteerNavigation?.FirstName ?? "N/A"}",
                    Grade = v.Volunteer.VolunteerGrade?.Grade?.Name ?? "Sin grado",
                    Status = v.Status
                }).ToList();

            var guardDTO = new GuardDTO
            {
                GuardId = id,
                GuardDate = guardModel.GuardDate,
                ShiftId = guardModel.ShiftId,
                ShiftName = guardModel.Shift.Name,
                ResponsibleId = responsibleModel.VolunteerId,
                ResponsibleFullname = $"{responsibleModel.Volunteer.VolunteerNavigation.LastName} {responsibleModel.Volunteer.VolunteerNavigation.FirstName}, {responsibleModel.Volunteer.VolunteerGrade.Grade.Name}",
                Location = guardModel.Location,
                Observation = guardModel.Observations,
                Status = guardModel.Status,
                VoluntareeGuards = voluntareeGuardDTO.ToList()
            };

            return guardDTO;
        }

        public async Task<(IEnumerable<GuardDTO>, int totalPages)> GetGuardsAsync(string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
        {
            // Valores predeterminados
            int pageNumber = page ?? 1;
            int pageSize = limit ?? 10;

            var queryable = _context.Guards
                .Include(g => g.Shift)
                .Include(g => g.VolunteerGuards)
                    .ThenInclude(vg => vg.Volunteer)
                        .ThenInclude(v => v.VolunteerNavigation) // Para obtener nombres
                .Include(g => g.VolunteerGuards)
                    .ThenInclude(vg => vg.Volunteer)
                        .ThenInclude(v => v.VolunteerGrade) // Para obtener grado
                        .ThenInclude(g => g.Grade)
                .AsQueryable();

            // Aplicar filtros
            if (!string.IsNullOrEmpty(query))
            {
                queryable = queryable.Where(g =>
                    g.Location.Contains(query) ||
                    g.Observations.Contains(query) ||
                    g.VolunteerGuards
                        .Where(vg => vg.Role == "Responsable")
                        .Any(vg => vg.Volunteer.VolunteerNavigation.FirstName.Contains(query) ||
                                   vg.Volunteer.VolunteerNavigation.LastName.Contains(query))
                );
            }

            if (status.HasValue)
            {
                queryable = queryable.Where(g => g.Status == status.Value);
            }

            if (shift.HasValue)
            {
                queryable = queryable.Where(g => g.ShiftId == shift.Value);
            }

            if (startDate.HasValue)
            {
                queryable = queryable.Where(g => g.GuardDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                queryable = queryable.Where(g => g.GuardDate <= endDate.Value);
            }

            queryable = queryable.OrderByDescending(o => o.CreatedAt);

            var totalRecords = await queryable.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            // Paginación
            queryable = queryable
                .OrderByDescending(g => g.GuardDate) // Ordenar por fecha descendente
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            var guards = await queryable.ToListAsync();

            var guardDTOs = guards.Select(g => new GuardDTO
            {
                GuardId = g.GuardId,
                GuardDate = g.GuardDate,
                ShiftId = g.ShiftId,
                ShiftName = g.Shift.Name,
                ResponsibleId = g.VolunteerGuards
                    .Where(vg => vg.Role == "Responsable")
                    .Select(vg => vg.VolunteerId)
                    .FirstOrDefault(),
                ResponsibleFullname = g.VolunteerGuards
                    .Where(vg => vg.Role == "Responsable")
                    .Select(vg => $"{vg.Volunteer.VolunteerNavigation.LastName} {vg.Volunteer.VolunteerNavigation.FirstName}, {vg.Volunteer.VolunteerGrade.Grade.Name}")
                    .FirstOrDefault() ?? "No asignado",
                Location = g.Location,
                VolunteerQuantity = g.VolunteerGuards.Count(vg => vg.Role == "Voluntario"),
                Observation = g.Observations,
                Status = g.Status
            }).ToList();

            return (guardDTOs, totalPages);
        }

        public async Task<(IEnumerable<ReportGuardDTO>, int totalPages)> GetGuardsByVoluntareeIdAsync(
           int id, string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
        {
            // Valores predeterminados
            int pageNumber = page ?? 1;
            int pageSize = limit ?? 10;

            var queryable = _context.Guards
                .Include(g => g.Shift)
                .Include(g => g.VolunteerGuards)
                    .ThenInclude(vg => vg.Volunteer)
                        .ThenInclude(v => v.VolunteerNavigation) // Nombres
                .Include(g => g.VolunteerGuards)
                    .ThenInclude(vg => vg.Volunteer)
                        .ThenInclude(v => v.VolunteerGrade) // Grado
                        .ThenInclude(g => g.Grade)
                .Where(g => g.VolunteerGuards.Any(v => v.VolunteerId == id))
                .AsQueryable();

            // Aplicar filtros
            if (!string.IsNullOrEmpty(query))
            {
                queryable = queryable.Where(g =>
                    g.Location.Contains(query) ||
                    g.Observations.Contains(query) ||
                    g.VolunteerGuards
                        .Where(vg => vg.Role == "Responsable")
                        .Any(vg => vg.Volunteer.VolunteerNavigation.FirstName.Contains(query) ||
                                   vg.Volunteer.VolunteerNavigation.LastName.Contains(query))
                );
            }

            if (status.HasValue)
            {
                queryable = queryable.Where(g =>
                    g.VolunteerGuards.Any(vg => vg.VolunteerId == id && vg.Status == status.Value));
            }

            if (shift.HasValue)
                queryable = queryable.Where(g => g.ShiftId == shift.Value);

            if (startDate.HasValue)
                queryable = queryable.Where(g => g.GuardDate >= startDate.Value);

            if (endDate.HasValue)
                queryable = queryable.Where(g => g.GuardDate <= endDate.Value);

            queryable = queryable.OrderByDescending(o => o.CreatedAt);

            // Paginación
            var totalRecords = await queryable.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var guards = await queryable
                .OrderByDescending(g => g.GuardDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var guardDTOs = guards.Select(g =>
            {
                return new ReportGuardDTO
                {
                    GuardId = g.GuardId,
                    GuardDate = g.GuardDate,
                    ShiftId = g.ShiftId,
                    ShiftName = g.Shift.Name,
                    ResponsibleId = g.VolunteerGuards
                        .Where(vg => vg.Role == "Responsable")
                        .Select(vg => vg.VolunteerId)
                        .FirstOrDefault(),
                    ResponsibleFullname = g.VolunteerGuards
                        .Where(vg => vg.Role == "Responsable")
                        .Select(vg => $"{vg.Volunteer.VolunteerNavigation.LastName} {vg.Volunteer.VolunteerNavigation.FirstName}, {vg.Volunteer.VolunteerGrade.Grade.Name}")
                        .FirstOrDefault() ?? "No asignado",
                    Location = g.Location,
                    Observation = g.Observations,
                    Status = g.VolunteerGuards.FirstOrDefault(vg => vg.VolunteerId == id)?.Status
                };
            }).ToList();

            return (guardDTOs, totalPages);
        }


        public async Task<int> CreateGuardAsync(GuardEntity entity)
        {
            var model = new Guard
            {
                GuardDate = entity.GuardDate,
                Location = entity.Location,
                ShiftId = entity.ShiftId,
                UserId = entity.UserId,
            };

            await _context.Guards.AddAsync(model);
            await _context.SaveChangesAsync();
            return model.GuardId;
        }

        public async Task CreateVoluntareeGuard(IEnumerable<VoluntareeGuardEntity> entities)
        {
            var models = entities.Select(entities => new VolunteerGuard
            {
                VolunteerId = entities.VoluntareeId,
                GuardId = entities.GuardId,
                Role = entities.Role,
                UserId = entities.UserId,
            });
            await _context.VolunteerGuards.AddRangeAsync(models);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVoluntareeGuard(int id)
        {
            var voluntareeGuards = await _context.VolunteerGuards
                .Where(v => v.GuardId == id)
                .ToListAsync();

            if (voluntareeGuards.Any())
            {
                _context.VolunteerGuards.RemoveRange(voluntareeGuards);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateGuardAsync(GuardEntity entity)
        {
            var guard = await _context.Guards.FindAsync(entity.GuardId);

            if (guard == null)
                throw new BusinessException("Guardia no encontrada"); ;

            if (entity.GuardDate != default)
                guard.GuardDate = entity.GuardDate;

            if (!string.IsNullOrWhiteSpace(entity.Location))
                guard.Location = entity.Location;

            if (entity.ShiftId > 0)
                guard.ShiftId = entity.ShiftId;

            if (!string.IsNullOrWhiteSpace(entity.Observations))
                guard.Observations = entity.Observations;

            if (entity.UserId > 0)
                guard.UserId = entity.UserId;

            if (entity.Status.HasValue)
                guard.Status = (sbyte)entity.Status.Value;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateGuardAssistanceAsync(VoluntareeGuardEntity entity)
        {
            var voluntareeGuard = await _context.VolunteerGuards.FindAsync(entity.VoluntareeId, entity.GuardId);

            if (voluntareeGuard == null)
                throw new BusinessException("Guardia no encontrada");

            voluntareeGuard.Status = entity.Status;
            voluntareeGuard.UserId = entity.UserId;

            await _context.SaveChangesAsync();
        }
    }
}
