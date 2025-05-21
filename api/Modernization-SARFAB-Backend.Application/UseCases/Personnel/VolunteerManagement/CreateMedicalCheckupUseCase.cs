using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class CreateMedicalCheckupUseCase
    {
        private readonly IMedicalCheckupRepository _repository;
        private readonly ILoggingService _loggingService;

        public CreateMedicalCheckupUseCase(
            IMedicalCheckupRepository repository,
            ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(CreateMedicalCheckupDTO dto, short userId, string userName)
        {
            try
            {
                var entity = new MedicalCheckupEntity(
                    dto.VolunteerId,
                    dto.CheckupDate,
                    dto.ExpirationDate,
                    dto.Observations,
                    userId
                );
                var checkupId = await _repository.CreateMedicalCheckupAsync(entity);
                _loggingService.LogInformation($"Usuario <{userName}> registró chequeo médico con id {checkupId} para voluntario con Id: {dto.VolunteerId}.");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al crear chequeo médico: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
