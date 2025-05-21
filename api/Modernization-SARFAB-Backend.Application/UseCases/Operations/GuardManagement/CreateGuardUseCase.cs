using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{
    public class CreateGuardUseCase
    {
        private readonly IGuardRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public CreateGuardUseCase(IGuardRepository repository, IUnitOfWork unitOfWork, ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task Execute(CreateGuardDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();

                try
                {
                    var guardEntity = new GuardEntity
                    {
                        GuardDate = dto.GuardDate,
                        Location = dto.Location,
                        ShiftId = dto.shiftId,
                        UserId = userId,
                    };

                    var guardId = await _repository.CreateGuardAsync(guardEntity);

                    var responsible = new VoluntareeGuardEntity
                    {
                        GuardId = guardId,
                        VoluntareeId = dto.ResponsibleId,
                        Role = "Responsable",
                        UserId = userId
                    };

                    var voluntareeGuard = dto.VoluntareeIds.Select(v => new VoluntareeGuardEntity
                    {
                        GuardId = guardId,
                        VoluntareeId = v,
                        Role = "Voluntario",
                        UserId = userId
                    });

                    voluntareeGuard = voluntareeGuard.Append(responsible);

                    await _repository.CreateVoluntareeGuard(voluntareeGuard);

                    await _unitOfWork.CommitAsync();

                    _loggingService.LogInformation($"Usuario <{userName}> registró una guardia con id {guardId}");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error al crear una guardia: {ex.Message}");
                    throw;
                }
            });
        }
    }
}
