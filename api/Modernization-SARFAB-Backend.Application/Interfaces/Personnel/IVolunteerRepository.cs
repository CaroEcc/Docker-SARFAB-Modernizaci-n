using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IVolunteerRepository
    {
        Task<int> CreateVolunteerAsync(VolunteerEntity volunteer, int volunteerGradeId, MedicalCheckupEntity medicalCheckupEntity);
        Task<(IEnumerable<(VolunteerEntity Volunteer, string GradeName)> Data, int TotalPages)> GetActiveVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10);
        Task<(VolunteerEntity Volunteer, string GradeName, string DepartmentName)> GetVolunteerByIdAsync(int id);
        Task UpdateVolunteerAsync(VolunteerEntity entity, int? gradeId);
        Task<(IEnumerable<(VolunteerEntity Volunteer, string GradeName)> Data, int TotalPages)> GetHistoricalListVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            VolunteerEntity.VolunteerStatus? status = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10);
        Task UpdateStatusAsync(VolunteerEntity entity);
        Task<IEnumerable<RankGradeDTO>> GetAllGradesAsync();
        Task<string?> GetVolunteerTypeByIdAsync(int volunteerId);
        Task<(string FullName, string GradeName)?> GetFullNameAndGradeByIdAsync(int volunteerId);
    }
}
