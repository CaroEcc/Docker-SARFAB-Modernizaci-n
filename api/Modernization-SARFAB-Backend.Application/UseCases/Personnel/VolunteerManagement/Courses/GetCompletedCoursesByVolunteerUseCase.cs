using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;

public class GetCompletedCoursesByVolunteerUseCase
{
    private readonly ICourseRepository _repository;

    public GetCompletedCoursesByVolunteerUseCase(ICourseRepository repository)
    {
        _repository = repository;
    }

    public async Task<(IEnumerable<CompletedCourseDTO> Data, int TotalPages)> ExecuteAsync(int volunteerId, int page, int pageSize)
    {
        return await _repository.GetCompletedCoursesByVolunteerAsync(volunteerId, page, pageSize);
    }
}