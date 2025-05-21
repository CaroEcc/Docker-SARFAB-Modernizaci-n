using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

public class CreateOperationTypeUseCase
{
    private readonly IOperationTypeRepository _repository;
    private readonly ILoggingService _loggingService;

    public CreateOperationTypeUseCase(
        IOperationTypeRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(CreateOperationTypeDTO dto, short userId, string userName)
    {
        try
        {
            await _repository.CreateOperationTypeAsync(dto);
            _loggingService.LogInformation($"El usuario <{userName}> creó un tipo de operación: {dto.Name}.");
        }
        catch (Exception)
        {
            throw new BusinessException("Error al crear el tipo de operación.");
        }
    }
}