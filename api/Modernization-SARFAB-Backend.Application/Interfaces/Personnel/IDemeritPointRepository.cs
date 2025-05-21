using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IDemeritPointRepository
    {
        Task<int> GetTotalPointsLost(int volunteerId);
        Task<IEnumerable<DemeritPointEntity>> GetListLostPoints(int volunteerId);
        Task CreateDemeritPointAsync(DemeritPointEntity demeritPoint);
        Task<IEnumerable<(int VolunteerId, int TotalPointsLost)>> GetTotalPointsLostForAllVolunteersAsync();
        Task DeleteDemeritPointAsync(int id);
    }
}
