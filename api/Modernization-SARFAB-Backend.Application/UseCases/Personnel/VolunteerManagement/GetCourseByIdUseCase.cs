using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetCourseByIdUseCase
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IUnitOfWork _unitOfWork;

        public GetCourseByIdUseCase(ICourseRepository courseRepository, IUnitOfWork unitOfWork)
        {
            _courseRepository = courseRepository;
            _unitOfWork = unitOfWork;
        }
        
        public async Task<CourseDetailDTO> ExecuteAsync(int id)
        {
            CourseDetailDTO result = null;

            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var course = await _courseRepository.GetCourseById(id);
                    if (course == null)
                        throw new BusinessException("Curso no encontrado");

                    var participants = await _courseRepository.GetCourseParticipantsAsync(id);

                    result = new CourseDetailDTO
                    {
                        CourseId = course.CourseId,
                        Name = course.Name,
                        Description = course.Description,
                        Participants = participants.ToList()
                    };

                    await _unitOfWork.CommitAsync();
                }
                catch
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
                }
            });

            return result;
        }
    }
}