using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Exceptions;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Mappers.Personnel.Recruitment;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using MySqlConnector;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.RecruitmentEntity;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories
{
    public class RecruitmentRepository : IRecruitmentRepository
    {
        private readonly SARFABSystemDbContext _context;

        public RecruitmentRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateRecruitmentAsync(RecruitmentEntity entity)
        {
            var model = entity.ToModel();

            await _context.Recruitments.AddAsync(model);
            await _context.SaveChangesAsync();

            return model.RecruitmentId;
        }
        public async Task<(IEnumerable<RecruitmentEntity> Data, int TotalPages)> GetRecruitmentsAsync(
            string searchTerm = null,
            RecruitmentStatus? status = RecruitmentStatus.InProcess,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Recruitments.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(r => r.FirstName.Contains(searchTerm) ||
                                         r.LastName.Contains(searchTerm) ||
                                         r.Ci.Contains(searchTerm));

            if (status.HasValue)
                query = query.Where(r => r.Status == (sbyte)status.Value);

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var models = await query
                .OrderBy(r => r.RecruitmentId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (models.Select(r => r.ToEntity()), totalPages);
        }
        public async Task<RecruitmentEntity> GetRecruitmentByIdAsync(int id)
        {
            var model = await _context.Recruitments.FirstOrDefaultAsync(r => r.RecruitmentId == id);
            if (model == null) throw new BusinessException("Recluta no encontrado");

            return model.ToEntity();
        }
        public async Task UpdateRecruitmentAsync(RecruitmentEntity entity)
        {
            var model = await _context.Recruitments.FirstOrDefaultAsync(r => r.RecruitmentId == entity.RecruitmentId);
            if (model == null) throw new BusinessException("Recluta no encontrado");

            model.FirstName = entity.FirstName;
            model.LastName = entity.LastName;
            model.Ci = entity.Ci;
            model.BirthDate = entity.BirthDate;
            model.WantsMilitaryService = entity.WantsMilitaryService;

            await _context.SaveChangesAsync();
        }
        public async Task UpdateRecruitmentStatusAsync(RecruitmentEntity entity)
        {
            var model = await _context.Recruitments.FindAsync(entity.RecruitmentId);
            if (model == null) throw new BusinessException("Recluta no encontrado");
            model.Status = (sbyte?)entity.Status;
            await _context.SaveChangesAsync();
        }
    }
}
