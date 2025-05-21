using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using System;
using System.Threading.Tasks;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class UpdateOperationStatusUseCase
    {
        private readonly ISarOperationRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateOperationStatusUseCase(ISarOperationRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int operationId, SarOperationEntity.OperationStatus status, string userName, string? observations = null)
        {
            try
            {
                switch (status)
                {
                    case SarOperationEntity.OperationStatus.Active:
                    case SarOperationEntity.OperationStatus.Deleted:
                        break;
                    default:
                        throw new BusinessException("Estado no válido");
                }

                var operation = new SarOperationEntity(operationId, status);

                if (status == SarOperationEntity.OperationStatus.Deleted && !string.IsNullOrEmpty(observations))
                {
                    operation.SetObservations(observations);
                }

                await _repository.UpdateOperationStatusAsync(operation);
                _loggingService.LogInformation($"El usuario <{userName}> actualizó el estado de la operación con Id: {operationId} a estado: {status}");
            }
            catch (BusinessException) { throw; }
            catch (Exception)
            {
                throw new BusinessException("Error al actualizar estado de la operación");
            }
        }
    }
}