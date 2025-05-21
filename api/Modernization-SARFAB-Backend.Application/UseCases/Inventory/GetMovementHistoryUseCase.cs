using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetMovementHistoryUseCase
{
    private readonly IItemRepository _itemRepository;

    public GetMovementHistoryUseCase(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    public async Task<(IEnumerable<MovementHistoryDTO> Data, int TotalPages)> ExecuteAsync(
        string searchTerm = null,
        int? movementType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        int pageIndex = 1,
        int pageSize = 10)
    {
        var history = await _itemRepository.GetMovementHistoryAsync(
            searchTerm, movementType, startDate, endDate, pageIndex, pageSize
        );
        return history;
    }
}