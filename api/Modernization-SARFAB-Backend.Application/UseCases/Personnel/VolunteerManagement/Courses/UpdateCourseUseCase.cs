using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

public class UpdateCourseUseCase
{
    private readonly ICourseRepository _courseRepository;
    private readonly ILoggingService _loggingService;
    
    public UpdateCourseUseCase(ICourseRepository courseRepository, ILoggingService loggingService)
    {
        _courseRepository = courseRepository;
        _loggingService = loggingService;
    }
    
    public async Task ExecuteAsync(UpdateCourseDTO course, int id, string userName)
    {
        try
        {
            var existingEntity = await _courseRepository.GetCourseById(id);
            if (existingEntity == null)
                throw new BusinessException("Curso no encontrado");

            existingEntity.UpdateDetails(course.Name, course.Description);

            await _courseRepository.UpdateCourseAsync(existingEntity);
            
            _loggingService.LogInformation($"Usuario <{userName}> actualizó el curso con id {existingEntity.CourseId}.");
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al actualizar el curso.", ex);
            throw new BusinessException(ex.Message);
        }
    }
}