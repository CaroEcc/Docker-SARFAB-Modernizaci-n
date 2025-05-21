using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

public class UpdateOperationCategoryUseCase
{
    private readonly IOperationCategoryRepository _repository;
    private readonly ILoggingService _loggingService;

    public UpdateOperationCategoryUseCase(
        IOperationCategoryRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(int operationCategoryId, UpdateOperationCategoryDTO dto, short userId, string userName)
    {
        try
        {
            await _repository.UpdateAsync(operationCategoryId, dto);
            _loggingService.LogInformation($"El usuario <{userName}> actualizó el nombre de la categoría de operación con ID {operationCategoryId}.");
        }
        catch (KeyNotFoundException ex)
        {
            throw new BusinessException(ex.Message);
        }
        catch (Exception)
        {
            throw new BusinessException("Error al actualizar la categoría de operación.");
        }
    }
}