using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface ICourseRepository
    {
        Task<CourseEntity> GetLastCompletedCourseAsync(int volunteerId);
        Task<CourseEntity> GetCourseById(int id);
        Task<(IEnumerable<CourseEntity> Data, int TotalPages)> GetCoursesAsync(
            string? courseName = null,
            int page = 1,
            int pageSize = 10);
        Task<IEnumerable<CourseSelectDTO>> GetCoursesForSelectAsync(int volunteerId);
        Task AssignCourseAsync(VolunteerCourseEntity volunteerCourse);
        Task<(IEnumerable<CompletedCourseDTO> Data, int TotalPages)> GetCompletedCoursesByVolunteerAsync(int volunteerId, int page, int pageSize);
        Task<int> CreateCourseAsync(CourseEntity course);
        Task UpdateCourseAsync(CourseEntity course);
        Task<IEnumerable<CourseParticipantDTO>> GetCourseParticipantsAsync(int courseId);
        Task AssignMultipleVolunteersToCourseAsync(IEnumerable<VolunteerCourseEntity> volunteerCourses);
    }
}
