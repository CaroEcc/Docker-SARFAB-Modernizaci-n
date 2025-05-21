using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetVolunteersWithRankUseCase
{
    private readonly IContextDataRepository _repository;
    private readonly ILoggingService _loggingService;

    public GetVolunteersWithRankUseCase(IContextDataRepository repository, ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task<IEnumerable<VolunteerOperationalDataDTO>> ExecuteAsync()
    {
        try
        {
            var volunteers = await _repository.GetVolunteersWithRankAsync();
            return volunteers;
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al obtener los datos de voluntarios: {ex.Message}");
            throw new ApplicationException("Error al obtener los datos de voluntarios.", ex);
        }
    }
}