using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class CreateRecruitmentUseCase
    {
        private readonly IRecruitmentRepository _repository;
        private readonly ILoggingService _loggingService;

        public CreateRecruitmentUseCase(
            IRecruitmentRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task<int> ExecuteAsync(CreateRecruitmentDTO dto, short userId, string userName)
        {
            try
            {
                var entity = new RecruitmentEntity(
                    dto.FirstName,
                    dto.LastName,
                    dto.CI,
                    dto.BirthDate,
                    dto.WantsMilitaryService,
                    userId
                );
                var recruitmentId = await _repository.CreateRecruitmentAsync(entity);
                _loggingService.LogInformation($"El usuario <{userName}> registró exitosamente el reclutamiento con Id: {recruitmentId}.");
                return recruitmentId;
            }
            catch (Exception ex)
            {
                throw new BusinessException("Error inesperado al crear reclutamiento: " + ex.Message);
            }
        }
    }
}
