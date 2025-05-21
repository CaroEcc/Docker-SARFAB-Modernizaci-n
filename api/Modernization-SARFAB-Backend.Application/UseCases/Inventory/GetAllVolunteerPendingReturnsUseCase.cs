using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetAllVolunteerPendingReturnsUseCase
{
    private readonly IItemRepository _repository;

    public GetAllVolunteerPendingReturnsUseCase(IItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<VolunteerWithPendingReturnDTO>> ExecuteAsync()
    {
        var pendingReturns = await _repository.GetAllVolunteerPendingReturnsAsync();
        return pendingReturns;
    }
}