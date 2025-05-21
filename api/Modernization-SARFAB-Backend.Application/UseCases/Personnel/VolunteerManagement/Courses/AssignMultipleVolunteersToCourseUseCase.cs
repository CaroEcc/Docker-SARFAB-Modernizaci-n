using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement.Courses
{
    public class AssignMultipleVolunteersToCourseUseCase
    {
        private readonly ICourseRepository _repository;
        private readonly ILoggingService _loggingService;

        public AssignMultipleVolunteersToCourseUseCase(ICourseRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(AssignMultipleVolunteersToCourseDTO dto, short userId, string userName)
        {
            try
            {
                var currentDate = DateOnly.FromDateTime(DateTime.UtcNow);
                if (dto.Volunteers.Any(v => v.CompletionDate > currentDate))
                {
                    throw new BusinessException("Las fechas de finalización no pueden ser posteriores a la actual.");
                }

                var volunteerCourses = dto.Volunteers.Select(v => new VolunteerCourseEntity(
                    v.VolunteerId,
                    dto.CourseId,
                    v.CompletionDate,
                    userId
                )).ToList();

                await _repository.AssignMultipleVolunteersToCourseAsync(volunteerCourses);

                _loggingService.LogInformation($"Usuario <{userName}> asignó el curso {dto.CourseId} a {volunteerCourses.Count} voluntarios.");
            }
            catch (BusinessException ex)
            {
                _loggingService.LogWarning($"Validación fallida al asignar cursos: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al asignar cursos: {ex.Message}", ex);
                throw new BusinessException("Ocurrió un error al asignar el curso a múltiples voluntarios.");
            }
        }
    }
}