using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.MilitaryManagement
{
    public class MilitaryRankAssignmentRepository : IMilitaryRankAssignmentRepository
    {
        private readonly SARFABSystemDbContext _context;

        private static readonly List<string> OfficerRanks = new()
        {
            "Subteniente", "Teniente", "Capitán", "Mayor", "Teniente Coronel", "Coronel"
        };

        private static readonly List<string> NonCommissionedRanks = new()
        {
            "Sargento", "Sargento Segundo", "Sargento Primero", "Suboficial", "Suboficial Segundo",
            "Suboficial Primero", "Suboficial Mayor", "Suboficial Maestro"
        };

        public MilitaryRankAssignmentRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetNextRankIdAsync(int currentRankId)
        {
            var currentRank = await _context.MilitaryRanks
                .Where(r => r.RankId == currentRankId)
                .Select(r => new { r.RankId, r.Name })
                .FirstOrDefaultAsync();

            if (currentRank == null)
                throw new BusinessException("Rango actual no encontrado");

            var rankHierarchy = OfficerRanks.Contains(currentRank.Name) ? OfficerRanks
                               : NonCommissionedRanks.Contains(currentRank.Name) ? NonCommissionedRanks
                               : throw new BusinessException("Rango no válido para ascenso");

            var currentIndex = rankHierarchy.IndexOf(currentRank.Name);
            if (currentIndex == rankHierarchy.Count - 1)
                throw new BusinessException("No hay un rango superior disponible");

            var nextRank = await _context.MilitaryRanks
                .Where(r => r.Name == rankHierarchy[currentIndex + 1])
                .Select(r => r.RankId)
                .FirstOrDefaultAsync();

            return nextRank != 0 ? nextRank : throw new BusinessException("El siguiente rango no está registrado en la base de datos");
        }

        public async Task PromoteAsync(int militaryId)
        {
            var assignment = await _context.MilitaryRankAssignments
                .FirstOrDefaultAsync(mra => mra.MilitaryId == militaryId)
                ?? throw new BusinessException("Asignación de rango no encontrada");

            assignment.RankId = await GetNextRankIdAsync(assignment.RankId);
            assignment.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }
    }
}
