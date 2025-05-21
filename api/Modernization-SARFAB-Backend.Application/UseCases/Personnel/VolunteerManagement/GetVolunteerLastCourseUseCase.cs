using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetVolunteerLastCourseUseCase
    {
        private readonly ICourseRepository _repository;
        public GetVolunteerLastCourseUseCase(ICourseRepository repository)
        {
            _repository = repository;
        }
        public async Task<LastCompletedCourseDTO> ExecuteAsync(int volunteerId)
        {
            var courseEntity = await _repository.GetLastCompletedCourseAsync(volunteerId);
            return new LastCompletedCourseDTO {
                CourseName = courseEntity.Name
            };
        }
    }
}
