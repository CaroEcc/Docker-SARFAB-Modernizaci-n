using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

public class CreateOperationCategoryUseCase
{
    private readonly IOperationCategoryRepository _repository;
    private readonly ILoggingService _loggingService;

    public CreateOperationCategoryUseCase(
        IOperationCategoryRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(CreateOperationCategoryDTO dto, short userId, string userName)
    {
        try
        {
            await _repository.CreateAsync(dto);
            _loggingService.LogInformation($"El usuario <{userName}> creó una categoría de operación: {dto.Name}.");
        }
        catch (Exception)
        {
            throw new BusinessException("Error al crear la categoría de operación.");
        }
    }
}