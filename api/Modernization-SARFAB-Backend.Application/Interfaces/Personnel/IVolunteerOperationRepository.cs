using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

public interface IVolunteerOperationRepository
{
    Task<(IEnumerable<VolunteerOperationReportDTO> Data, int TotalPages)> 
        GetVolunteerOperationsReportAsync(
            int volunteerId, 
            string? searchTerm, 
            int? status,
            int? categoryId, 
            DateTime? startDate, 
            DateTime? endDate, 
            bool orderByDateAsc, 
            int page, 
            int pageSize);
}