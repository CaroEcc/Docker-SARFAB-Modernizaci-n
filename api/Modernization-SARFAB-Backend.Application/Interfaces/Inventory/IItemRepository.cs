using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Domain.Entities.Inventory;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

public interface IItemRepository
{
    Task<int> CreateItemAsync(ItemEntity item);
    Task UpdateItemAsync(ItemEntity item);
    Task<ItemEntity> GetItemByIdAsync(int id);
    Task<IEnumerable<VolunteerPendingReturnDTO>> GetVolunteerPendingReturnsAsync(int itemId);
    Task<(IEnumerable<InventoryItemDTO> Data, int TotalPages)> GetInventoryItemsAsync(
        string searchTerm = null,
        bool orderByNameAsc = true,
        int pageIndex = 0,
        int pageSize = 10);
    Task<int> CreateInventoryMovementAsync(int volunteerId, short userId);
    Task RegisterMovementDetailAsync(int movementId, int itemId, int quantity, short userId,  short movementType);
    Task UpdateVolunteerTrackingAsync(int volunteerId, int itemId, int quantity, short userId,  short movementType);

    Task RegisterBatchMovementDetailsAsync(int movementId, List<MovementDetailDTO> items, short userId,
        short movementType);

    Task UpdateBatchVolunteerTrackingAsync(int volunteerId, List<MovementDetailDTO> items, short userId,
        short movementType);
    Task<int> GetPendingReturnAmountAsync(int volunteerId, int itemId);
    Task<IEnumerable<ItemDTO>> GetAllItemsAsync();
    Task<IEnumerable<ItemDTO>> GetItemsOwedByVolunteerAsync(int volunteerId);

    Task<(IEnumerable<MovementHistoryDTO> Data, int TotalPages)> GetMovementHistoryAsync(
        string searchTerm = null,
        int? movementType = null, // 0 para extracción, 1 para devolución
        DateTime? startDate = null,
        DateTime? endDate = null,
        int pageIndex = 1,
        int pageSize = 10);
    Task<int> GetTotalPendingAmountAsync(int itemId);
    Task<IEnumerable<VolunteerWithPendingReturnDTO>> GetAllVolunteerPendingReturnsAsync();
    Task<int> GetAssignedQuantityAsync(int itemId);
}