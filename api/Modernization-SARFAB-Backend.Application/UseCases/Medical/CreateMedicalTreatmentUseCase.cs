using Modernization_SARFAB_Backend.Application.DTOs.Medical;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Medical;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Medical;

namespace Modernization_SARFAB_Backend.Application.UseCases.Medical
{
    public class CreateMedicalTreatmentUseCase
    {
        private readonly IMedicalTreatmentRepository _repository;
        private readonly ILoggingService _loggingService;

        public CreateMedicalTreatmentUseCase(IMedicalTreatmentRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(CreateMedicalTreatmentDTO dto, short userId, string userName)
        {
            try
            {
                var entity = new MedicalTreatmentEntity(
                    dto.TreatmentDate,
                    dto.Diagnosis,
                    dto.TreatmentDescription,
                    dto.AttendingPersonID,
                    dto.PatientPersonID,
                    userId
                 );
                var medicalTreatmentId = await _repository.CreateMedicalTreatment(entity);
                _loggingService.LogInformation($"Usuario <{userName}> registró tratamiento médico con id {medicalTreatmentId} para atender a persona con Id: {dto.PatientPersonID}.");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al crear tratamiento médico: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
