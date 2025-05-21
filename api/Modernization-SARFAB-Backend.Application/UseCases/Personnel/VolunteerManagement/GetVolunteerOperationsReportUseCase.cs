using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

public class GetVolunteerOperationsReportUseCase
{
    private readonly IVolunteerOperationRepository _repository;

    public GetVolunteerOperationsReportUseCase(IVolunteerOperationRepository repository)
    {
        _repository = repository;
    }

    public async Task<(IEnumerable<VolunteerOperationReportDTO> Data, int TotalPages)> ExecuteAsync(
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
        return await _repository.GetVolunteerOperationsReportAsync(
            volunteerId, searchTerm, status, categoryId, startDate, endDate, orderByDateAsc, page, pageSize);
    }
}
