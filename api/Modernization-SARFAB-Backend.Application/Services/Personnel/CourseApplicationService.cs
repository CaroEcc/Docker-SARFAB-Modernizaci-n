using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class CourseApplicationService
    {
        private readonly GetVolunteerLastCourseUseCase _getVolunteerLastCourseUseCase;
        private readonly ListCoursesUseCase _listCoursesUseCase;
        private readonly GetCourseByIdUseCase _getCourseByIdUseCase;
        private readonly GetCoursesForSelectUseCase _getCoursesForSelectUseCase;
        private readonly AssignVolunteerCourseUseCase _assignVolunteerCourseUseCase;
        private readonly GetCompletedCoursesByVolunteerUseCase _getCompletedCoursesByVolunteerUseCase;
        private readonly CreateCourseUseCase _createCourseUseCase;
        private readonly UpdateCourseUseCase _updateCourseUseCase;
        private readonly AssignMultipleVolunteersToCourseUseCase _assignMultipleVolunteersToCourseUseCase;

        public CourseApplicationService(GetVolunteerLastCourseUseCase getVolunteerLastCourseUseCase, 
            ListCoursesUseCase listCoursesUseCase, 
            GetCourseByIdUseCase getCourseByIdUseCase, 
            GetCoursesForSelectUseCase getCoursesForSelectUseCase, 
            AssignVolunteerCourseUseCase assignVolunteerCourseUseCase, 
            GetCompletedCoursesByVolunteerUseCase getCompletedCoursesByVolunteerUseCase,
            CreateCourseUseCase createCourseUseCase,
            UpdateCourseUseCase updateCourseUseCase,
            AssignMultipleVolunteersToCourseUseCase assignMultipleVolunteersToCourseUseCase)
        {
            _getVolunteerLastCourseUseCase = getVolunteerLastCourseUseCase;
            _listCoursesUseCase = listCoursesUseCase;
            _getCourseByIdUseCase = getCourseByIdUseCase;
            _getCoursesForSelectUseCase = getCoursesForSelectUseCase;
            _assignVolunteerCourseUseCase = assignVolunteerCourseUseCase;
            _getCompletedCoursesByVolunteerUseCase = getCompletedCoursesByVolunteerUseCase;
            _createCourseUseCase = createCourseUseCase;
            _updateCourseUseCase = updateCourseUseCase;
            _assignMultipleVolunteersToCourseUseCase = assignMultipleVolunteersToCourseUseCase;
        }

        public async Task<LastCompletedCourseDTO> GetLastCompletedCourseAsync(int volunteerId) => await _getVolunteerLastCourseUseCase.ExecuteAsync(volunteerId);
        public async Task<(IEnumerable<CourseDTO> Data, int TotalPages)> GetCoursesAsync(string? courseName, int page, int pageSize) 
            => await _listCoursesUseCase.ExecuteAsync(courseName, page, pageSize);
        public async Task<CourseDetailDTO> GetCourseByIdAsync(int id) 
            => await _getCourseByIdUseCase.ExecuteAsync(id);
        public async Task<IEnumerable<CourseSelectDTO>> GetCoursesForSelectAsync(int volunteerId) => await _getCoursesForSelectUseCase.ExecuteAsync(volunteerId);
        public async Task AssignCourseAsync(AssignCourseDTO volunteerCourse, short userId, string username) =>
            await _assignVolunteerCourseUseCase.ExecuteAsync(volunteerCourse, userId, username);
        public async Task<(IEnumerable<CompletedCourseDTO> Data, int TotalPages)> GetCompletedCoursesByVolunteerAsync(int volunteerId, int page, int pageSize)
            => await _getCompletedCoursesByVolunteerUseCase.ExecuteAsync(volunteerId, page, pageSize);
        public async Task CreateCourseAsync(CreateCourseDTO course, short userId, string username) 
            => await _createCourseUseCase.ExecuteAsync(course, userId, username);
        public async Task UpdateCourseAsync(UpdateCourseDTO course, int id, string username) 
            => await _updateCourseUseCase.ExecuteAsync(course, id, username);
        public async Task AssignMultipleVolunteersToCourseAsync(AssignMultipleVolunteersToCourseDTO dto, short userId, string username)
            => await _assignMultipleVolunteersToCourseUseCase.ExecuteAsync(dto, userId, username);
    }
}
