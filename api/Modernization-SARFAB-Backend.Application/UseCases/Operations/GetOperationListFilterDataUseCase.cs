using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetOperationListFilterDataUseCase
{
    private readonly IContextDataRepository _repository;
    private readonly ILoggingService _loggingService;
    
    public GetOperationListFilterDataUseCase(IContextDataRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }
    
    public async Task<DataOperationListFilterDTO> ExecuteAsync()
    {
        try
        {
            var contextData = await _repository.GetOperationListFilterDataAsync();
            return contextData;
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al obtener los datos de filtro para la lista de operaciones: {ex.Message}");
            throw new ApplicationException("Error al obtener los datos de filtro para la lista de operaciones.", ex);
        }
    }
}