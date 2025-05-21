using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IMedicalCheckupRepository
    {
        Task<IEnumerable<MedicalCheckupEntity>> GetMedicalCheckupsAsync(int volunteerId);
        Task<MedicalCheckupEntity> GetMedicalCheckupByIdAsync(int id);
        Task<int> CreateMedicalCheckupAsync(MedicalCheckupEntity medicalCheckup);
        Task UpdateMedicalCheckupAsync(MedicalCheckupEntity medicalCheckup);
        Task<IEnumerable<MedicalCheckupEntity>> GetExpiringCheckupsAsync(DateOnly targetDate);
        Task<IEnumerable<MedicalCheckupEntity>> GetExpiredCheckupsWithoutRenewalAsync(DateOnly today);
    }
}
