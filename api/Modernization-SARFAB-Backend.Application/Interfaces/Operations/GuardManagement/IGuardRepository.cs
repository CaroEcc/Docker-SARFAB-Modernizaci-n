using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement
{
    public interface IGuardRepository
    {
        Task<(IEnumerable<GuardDTO>, int totalPages)> GetGuardsAsync(string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit);
        Task<GuardDTO> GetGuardByIdAsync(int id);
        Task<(IEnumerable<ReportGuardDTO>, int totalPages)> GetGuardsByVoluntareeIdAsync(int id, string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit);
        Task<int> CreateGuardAsync(GuardEntity entity);
        Task CreateVoluntareeGuard(IEnumerable<VoluntareeGuardEntity> entities);
        Task UpdateGuardAsync(GuardEntity entity);
        Task DeleteVoluntareeGuard(int id);
        Task UpdateGuardAssistanceAsync(VoluntareeGuardEntity entity);
    }
}
