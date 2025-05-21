using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IMilitaryRepository
    {
        Task<int> CreateMilitaryAsync(MilitaryEntity entity, int militaryRankId);
        Task<(IEnumerable<(MilitaryEntity Military, string RankName)> Data, int TotalPages)> GetActiveMilitaryAsync(
            string searchTerm = null,
            MilitaryEntity.MilitaryStatus? status = MilitaryEntity.MilitaryStatus.Active,
            int? rankId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10);
        Task<(MilitaryEntity Military, string RankName)> GetMilitaryByIdAsync(int id);
        Task UpdateAsync(MilitaryEntity entity, int? militaryRankId);
        Task UpdateStatusAsync(MilitaryEntity militaryEntity);
        Task<IEnumerable<RankGradeDTO>> GetAllRanksAsync();
    }
}
