using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class CreateSarOperationUseCase
    {
        private readonly ISarOperationRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public CreateSarOperationUseCase(
            ISarOperationRepository repository,
            IUnitOfWork unitOfWork,
            ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(CreateSarOperationDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var requesterId = await _repository.CreateRequesterAsync(dto.Requester);
                    var sarOperationEntity = new SarOperationEntity(
                        dto.Address,
                        dto.DepartureDate,
                        dto.OperationTypeId,
                        dto.MunicipalityId,
                        requesterId,
                        dto.ArrivalDate,
                        userId
                    );

                    var operationId = await _repository.CreateSarOperationAsync(
                        sarOperationEntity,
                        dto.Responsible,
                        dto.Personnel
                    );

                    await _unitOfWork.CommitAsync();
                    _loggingService.LogInformation($"Usuario <{userName}> creó la operación con Id: {operationId}.");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error al crear la operación: {ex.Message}");
                    throw new BusinessException("Error al crear la operación.");
                }
            });
        }
    }

}