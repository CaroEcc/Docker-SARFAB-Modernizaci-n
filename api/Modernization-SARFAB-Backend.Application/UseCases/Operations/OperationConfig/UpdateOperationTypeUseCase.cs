using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

public class UpdateOperationTypeUseCase
{
    private readonly IOperationTypeRepository _repository;
    private readonly ILoggingService _loggingService;

    public UpdateOperationTypeUseCase(
        IOperationTypeRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(int operationTypeId, UpdateOperationTypeDTO dto, short userId, string userName)
    {
        try
        {
            await _repository.UpdateAsync(operationTypeId, dto);
            _loggingService.LogInformation($"El usuario <{userName}> actualizó el nombre del tipo de operación con ID {operationTypeId}.");
        }
        catch (KeyNotFoundException ex)
        {
            throw new BusinessException(ex.Message);
        }
        catch (Exception)
        {
            throw new BusinessException("Error al actualizar el tipo de operación.");
        }
    }
}