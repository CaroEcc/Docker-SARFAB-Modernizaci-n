using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class UpdateVolunteerUseCase
    {
        private readonly IVolunteerRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public UpdateVolunteerUseCase(
            IVolunteerRepository repository,
            IUnitOfWork unitOfWork,
            ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int id, UpdateVolunteerDTO dto, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var (entity, _, _) = await _repository.GetVolunteerByIdAsync(id);
                    if (entity == null)
                        throw new BusinessException("Voluntario no encontrado");

                    entity.UpdateDetails(
                        dto.FirstName, dto.LastName, dto.HomeAddress, dto.Ci,
                        dto.BirthDate, dto.Phone, dto.MobilePhone, dto.Email,
                        dto.DistinctiveFeatures, dto.VolunteerType, dto.Occupation,
                        dto.BloodType, dto.Religion, dto.Allergies,
                        dto.EmergencyContactFullName, dto.EmergencyContactRelation,
                        dto.EmergencyContactAddress, dto.EmergencyContactPhone,
                        dto.EmergencyContactMobile, dto.DepartmentId
                    );

                    await _repository.UpdateVolunteerAsync(entity, dto.GradeId);

                    await _unitOfWork.CommitAsync();

                    _loggingService.LogInformation($"Usuario <{userName}> actualizó voluntario con Id: {id} y nuevo grado {dto.GradeId}.");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error al actualizar voluntario: {ex.Message}");
                    throw;
                }
            });
        }
    }
}
