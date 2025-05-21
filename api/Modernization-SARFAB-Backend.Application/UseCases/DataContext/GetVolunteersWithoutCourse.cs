using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.DataContext;

public class GetVolunteersWithoutCourse
{
    private readonly IContextDataRepository _contextDataRepository;

    public GetVolunteersWithoutCourse(IContextDataRepository contextDataRepository)
    {
        _contextDataRepository = contextDataRepository;
    }

    public async Task<IEnumerable<VolunteerOperationalDataDTO>> Execute(int courseId)
    {
        return await _contextDataRepository.GetVolunteersWithoutCourseAsync(courseId);
    }
}