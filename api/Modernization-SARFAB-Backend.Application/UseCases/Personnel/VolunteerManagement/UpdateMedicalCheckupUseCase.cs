using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class UpdateMedicalCheckupUseCase
    {
        readonly IMedicalCheckupRepository _medicalCheckupRepository;
        private readonly ILoggingService _loggingService;

        public UpdateMedicalCheckupUseCase(IMedicalCheckupRepository medicalCheckupRepository, ILoggingService loggingService)
        {
            _medicalCheckupRepository = medicalCheckupRepository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(UpdateMedicalCheckupDTO dto, int id, string userName)
        {
            var existingEntity = await _medicalCheckupRepository.GetMedicalCheckupByIdAsync(id);
            if (existingEntity == null)
                throw new BusinessException("Chequeo médico no encontrado");
            existingEntity.UpdateDetails(dto.CheckupDate, dto.ExpirationDate, dto.Observations);
            await _medicalCheckupRepository.UpdateMedicalCheckupAsync(existingEntity);
            _loggingService.LogInformation($"El usuario <{userName}> actualizó el chequeo médico con Id: {id}");
        }
    }
}
