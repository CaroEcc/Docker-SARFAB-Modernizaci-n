using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class UpdateRecruitmentUseCase
    {
        private readonly IRecruitmentRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateRecruitmentUseCase(
            IRecruitmentRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(UpdateRecruitmentDTO dto, string userName)
        {
            var existingEntity = await _repository.GetRecruitmentByIdAsync(dto.RecruitmentId);
            if (existingEntity == null)
                throw new BusinessException("Reclutamiento no encontrado");

            existingEntity.UpdateDetails(dto.FirstName, dto.LastName, dto.CI, dto.BirthDate, dto.WantsMilitaryService);

            await _repository.UpdateRecruitmentAsync(existingEntity);
            _loggingService.LogInformation($"El usuario <{userName}> actualizó el reclutamiento con Id: {dto.RecruitmentId}");
        }

    }
}

