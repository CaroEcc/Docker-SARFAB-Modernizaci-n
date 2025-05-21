using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class GetOperationContextDataUseCase
    {
        private readonly IContextDataRepository _repository;
        private readonly ILoggingService _loggingService;

        public GetOperationContextDataUseCase(IContextDataRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task<OperationContextDataDTO> ExecuteAsync()
        {
            try
            {
                var contextData = await _repository.GetOperationContextDataAsync();
                return contextData;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al obtener los datos de contexto para crear la operación: {ex.Message}");
                throw new ApplicationException("Error al obtener los datos de contexto para crear la operación.", ex);
            }
        }
    }
}