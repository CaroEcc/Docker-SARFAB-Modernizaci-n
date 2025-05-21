using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel;

public class VolunterOperationApplicationService
{
    private readonly GetVolunteerOperationsReportUseCase _getVolunteerOperationsReportUseCase;
    
    public VolunterOperationApplicationService(GetVolunteerOperationsReportUseCase getVolunteerOperationsReportUseCase)
    {
        _getVolunteerOperationsReportUseCase = getVolunteerOperationsReportUseCase;
    }
    
    public async Task<(IEnumerable<VolunteerOperationReportDTO> Data, int TotalPages)> GetVolunteerOperationsReportAsync(
        int volunteerId, 
        string? searchTerm, 
        int? status,
        int? categoryId, 
        DateTime? startDate, 
        DateTime? endDate, 
        bool orderByDateAsc, 
        int page, 
        int pageSize)
    {
        return await _getVolunteerOperationsReportUseCase.ExecuteAsync(
            volunteerId, searchTerm, status, categoryId, startDate, endDate, orderByDateAsc, page, pageSize);
    }
}