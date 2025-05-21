using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;

public class CreateCourseUseCase
{
    private readonly ICourseRepository _courseRepository;
    private readonly ILoggingService _loggingService;
    
    public CreateCourseUseCase(ICourseRepository courseRepository, ILoggingService loggingService)
    {
        _courseRepository = courseRepository;
        _loggingService = loggingService;
    }
    
    public async Task ExecuteAsync(CreateCourseDTO course, short userId, string userName)
    {
        try
        {
            var entity = new CourseEntity(
                course.Name,
                course.Description,
                userId
            );
            var courseId = await _courseRepository.CreateCourseAsync(entity);
            _loggingService.LogInformation($"Usuario <{userName}> registró curso con id {courseId}.");
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al crear curso: {ex.Message}", ex);
            throw new BusinessException(ex.Message);
        }
    }
}