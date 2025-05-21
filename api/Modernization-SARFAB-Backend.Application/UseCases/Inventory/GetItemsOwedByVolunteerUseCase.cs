using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetItemsOwedByVolunteerUseCase
{
    private readonly IItemRepository _itemRepository;

    public GetItemsOwedByVolunteerUseCase(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    public async Task<IEnumerable<ItemDTO>> ExecuteAsync(int volunteerId)
    {
        var itemsOwed = await _itemRepository.GetItemsOwedByVolunteerAsync(volunteerId);
        return itemsOwed;
    }
}