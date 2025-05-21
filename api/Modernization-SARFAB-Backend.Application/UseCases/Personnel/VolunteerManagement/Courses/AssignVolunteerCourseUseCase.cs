using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses;

public class AssignVolunteerCourseUseCase
{
    private readonly ICourseRepository _repository;
    private readonly ILoggingService _loggingService;

    public AssignVolunteerCourseUseCase(ICourseRepository repository, ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(AssignCourseDTO dto, short userId, string userName)
    {
        try
        {
            if (dto.CompletionDate > DateOnly.FromDateTime(DateTime.UtcNow))
            {
                throw new BusinessException("La fecha de finalización no puede ser posterior a la actual.");
            }

            var volunteerCourse = new VolunteerCourseEntity(dto.VolunteerId, dto.CourseId, dto.CompletionDate, userId);
            await _repository.AssignCourseAsync(volunteerCourse);

            _loggingService.LogInformation($"Usuario <{userName}> asignó el curso {dto.CourseId} al voluntario {dto.VolunteerId} con fecha de finalización {dto.CompletionDate}.");
        }
        catch (BusinessException ex)
        {
            _loggingService.LogWarning($"Validación fallida al asignar curso: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al asignar curso: {ex.Message}", ex);
            throw new BusinessException("Ocurrió un error al asignar el curso.");
        }
    }
}

