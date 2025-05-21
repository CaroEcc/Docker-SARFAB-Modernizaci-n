using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    public class VolunteerGradePromotionRepository : IVolunteerGradePromotionRepository
    {
        private readonly SARFABSystemDbContext _context;

        public VolunteerGradePromotionRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }

        public async Task<int?> GetCurrentGradeIdAsync(int volunteerId)
        {
            return await _context.VolunteerGrades
                .Where(vg => vg.VolunteerId == volunteerId)
                .Select(vg => (int?)vg.GradeId)
                .FirstOrDefaultAsync();
        }

        public async Task<int?> GetGradeIdByNameAsync(string gradeName)
        {
            return await _context.Grades
                .Where(g => g.Name == gradeName)
                .Select(g => (int?)g.GradeId)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateGradeAsync(int volunteerId, int newGradeId)
        {
            var assignment = await _context.VolunteerGrades
                .FirstOrDefaultAsync(vg => vg.VolunteerId == volunteerId);

            if (assignment != null)
            {
                assignment.GradeId = newGradeId;
                assignment.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }
        public async Task<string?> GetGradeNameByIdAsync(int gradeId)
        {
            return await _context.Grades
                .Where(g => g.GradeId == gradeId)
                .Select(g => g.Name)
                .FirstOrDefaultAsync();
        }
    }
}
