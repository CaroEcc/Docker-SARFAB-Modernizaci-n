using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;

public class GetCoursesForSelectUseCase
{
    private readonly ICourseRepository _courseRepository;

    public GetCoursesForSelectUseCase(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<IEnumerable<CourseSelectDTO>> ExecuteAsync(int volunteerId)
    {
        return await _courseRepository.GetCoursesForSelectAsync(volunteerId);
    }
}
