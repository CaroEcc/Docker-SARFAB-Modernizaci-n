using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetMilitaryPersonnelWithRankUseCase
{
    private readonly IContextDataRepository _repository;
    private readonly ILoggingService _loggingService;

    public GetMilitaryPersonnelWithRankUseCase(IContextDataRepository repository, ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }

    public async Task<IEnumerable<MilitaryOperationalDataDTO>> ExecuteAsync()
    {
        try
        {
            var militaryPersonnel = await _repository.GetMilitaryPersonnelWithRankAsync();
            return militaryPersonnel;
        }
        catch (Exception ex)
        {
            _loggingService.LogError($"Error al obtener los datos de personal militar: {ex.Message}");
            throw new ApplicationException("Error al obtener los datos de personal militar.", ex);
        }
    }
}