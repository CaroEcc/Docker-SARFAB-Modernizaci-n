using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class CreateVolunteerUseCase
    {
        private readonly IVolunteerRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public CreateVolunteerUseCase(
            IVolunteerRepository repository,
            IUnitOfWork unitOfWork,
            ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(CreateVolunteerDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var personEntity = new PersonEntity(dto.FirstName, dto.LastName);

                    var volunteerEntity = new VolunteerEntity(
                        personEntity,
                        dto.HomeAddress,
                        dto.Ci,
                        dto.BirthDate,
                        dto.Phone,
                        dto.MobilePhone,
                        dto.Email,
                        dto.DistinctiveFeatures,
                        dto.VolunteerType,
                        dto.Occupation,
                        dto.BloodType,
                        dto.Religion,
                        dto.Allergies,
                        dto.EmergencyContactFullName,
                        dto.EmergencyContactRelation,
                        dto.EmergencyContactAddress,
                        dto.EmergencyContactPhone,
                        dto.EmergencyContactMobile,
                        dto.DepartmentId,
                        userId
                    );

                    var medicalCheckup = new MedicalCheckupEntity(
                        0,
                        dto.CheckupDate,
                        dto.ExpirationDate,
                        dto.Observations,
                        userId
                    );

                    var volunteerId = await _repository.CreateVolunteerAsync(volunteerEntity, dto.GradeId, medicalCheckup);

                    await _unitOfWork.CommitAsync();
                    _loggingService.LogInformation($"Usuario <{userName}> registró voluntario con Id: {volunteerId}, grado asignado: {dto.GradeId}.");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error al crear voluntario y asignar grado: {ex.Message}");
                    throw new BusinessException("Error al crear voluntario y asignar grado.");
                }
            });
        }
    }
}
