using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{
    public class EndGuardUseCase
    {
        private readonly IGuardRepository _repository;
        private readonly ILoggingService _loggingService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDemeritPointRepository _demeritPointRepository;

        public EndGuardUseCase(IGuardRepository repository, ILoggingService loggingService, IUnitOfWork unitOfWork, IDemeritPointRepository demeritPointRepository)
        {
            _repository = repository;
            _loggingService = loggingService;
            _unitOfWork = unitOfWork;
            _demeritPointRepository = demeritPointRepository;
        }

        public async Task Execute(EndGuardDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var guard = await _repository.GetGuardByIdAsync(dto.GuardId);
                    foreach (var v in dto.VolunteerAttendances)
                    {
                        var entity = new VoluntareeGuardEntity
                        {
                            GuardId = dto.GuardId,
                            VoluntareeId = v.VoluntareeId,
                            Status = v.Status,
                            UserId = userId
                        };

                        if (v.Status == 2)
                        {
                            var observation = v.Observation.Trim().Length == 1 ? "Ninguna" : v.Observation;
                            var demeritPoint = new DemeritPointEntity(v.VoluntareeId, 2, $"Guardia: {guard.ShiftName} - {guard.Location}", guard.GuardDate, observation, userId);
                            await _demeritPointRepository.CreateDemeritPointAsync(demeritPoint);
                        }

                        await _repository.UpdateGuardAssistanceAsync(entity);
                    }

                    var guardEntity = new GuardEntity
                    {
                        GuardId = dto.GuardId,
                        Observations = dto.Observations,
                        Status = GuardEntity.GuardStatus.Deleted,
                        UserId = userId
                    };

                    await _repository.UpdateGuardAsync(guardEntity);

                    _loggingService.LogInformation($"Usuario <{userName}> finalizó una guardia con id {dto.GuardId}");

                    await _unitOfWork.CommitAsync();
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error al finalizar una guardia: {ex.Message}");
                    throw;
                }
            });
        }
    }
}
