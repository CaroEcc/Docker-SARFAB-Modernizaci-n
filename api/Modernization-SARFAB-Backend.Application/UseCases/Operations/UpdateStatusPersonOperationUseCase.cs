using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class UpdateStatusPersonOperationUseCase
{
    private readonly ISarOperationRepository _repository;
    private readonly ILoggingService  _loggingService;
    
    public UpdateStatusPersonOperationUseCase(ISarOperationRepository repository, ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }
    
    public async Task ExecuteAsync(PersonOperationEntity personOperationEntity)
    {
        try
        {
            await _repository.UpdatePersonOperationAsync(personOperationEntity);
            _loggingService.LogInformation("Se actualizó el estado de la persona en la operación");

        }
        catch (Exception e)
        {
            _loggingService.LogInformation("Error al actualizar el estado de la persona en la operación", e);
            throw;
        }
    }
}