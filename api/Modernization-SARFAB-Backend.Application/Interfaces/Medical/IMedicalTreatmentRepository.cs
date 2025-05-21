using Modernization_SARFAB_Backend.Domain.Entities.Medical;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Medical
{
    public interface IMedicalTreatmentRepository
    {
        Task<(IEnumerable<MedicalTreatmentEntity>, int totalPages)> GetMedicalTreatmentsAsync(string? query, DateTime? startDate, DateTime? endDate, int? limit, int? page);
        Task<MedicalTreatmentEntity> GetMedicalTreatmentByIdAsync(int id);
        Task<int> CreateMedicalTreatment(MedicalTreatmentEntity entity);
        Task<int> UpdateMedicalTreatment(MedicalTreatmentEntity entity);
    }
}
