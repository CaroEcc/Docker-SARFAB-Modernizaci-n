using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IRecruitmentRepository
    {
        Task<int> CreateRecruitmentAsync(RecruitmentEntity entity);
        Task<(IEnumerable<RecruitmentEntity> Data, int TotalPages)> GetRecruitmentsAsync(string searchTerm, RecruitmentEntity.RecruitmentStatus? status, int page, int pageSize);
        Task<RecruitmentEntity> GetRecruitmentByIdAsync(int id);
        Task UpdateRecruitmentAsync(RecruitmentEntity entity);
        Task UpdateRecruitmentStatusAsync(RecruitmentEntity entity);
    }
}