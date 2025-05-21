using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetInventoryItemsUseCase
{
    private readonly IItemRepository _itemRepository;

    public GetInventoryItemsUseCase(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    public async Task<(IEnumerable<InventoryItemDTO> Data, int TotalPages)> ExecuteAsync(
        string searchTerm = null,
        bool orderByNameAsc = true,
        int pageIndex = 1,
        int pageSize = 10)
    {
        return await _itemRepository.GetInventoryItemsAsync(searchTerm, orderByNameAsc, pageIndex, pageSize);
    }
}