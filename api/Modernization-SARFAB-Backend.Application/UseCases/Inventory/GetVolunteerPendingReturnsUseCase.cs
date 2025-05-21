using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetVolunteerPendingReturnsUseCase
{
    private readonly IItemRepository _repository;

    public GetVolunteerPendingReturnsUseCase(IItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<VolunteerPendingReturnDTO>> ExecuteAsync(int itemId)
    {
        var pendingReturns = await _repository.GetVolunteerPendingReturnsAsync(itemId);
        return pendingReturns;
    }
}