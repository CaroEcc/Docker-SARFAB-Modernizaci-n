using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.UseCases.Inventory;

namespace Modernization_SARFAB_Backend.Application.Services.Inventory;

public class ItemApplicationService
{
    private readonly CreateItemUseCase _createItemUseCase;
    private readonly UpdateItemUseCase _updateItemUseCase;
    private readonly GetItemByIdWithPendingTableUseCase _getItemByIdWithPendingTableUseCase;
    private readonly GetInventoryItemsUseCase _getInventoryItemsUseCase;
    private readonly ExtractItemUseCase _extractItemUseCase;
    private readonly ReturnItemUseCase _returnItemUseCase;
    private readonly ExtractBatchItemsUseCase _extractBatchItemsUseCase;
    private readonly ReturnBatchItemsUseCase _returnBatchItemsUseCase;
    private readonly GetItemByIdUseCase _getItemByIdUseCase;
    private readonly GetVolunteerPendingReturnsUseCase _getVolunteerPendingReturnsUseCase;
    private readonly GetAllItemsUseCase _getAllItemsUseCase;
    private readonly GetItemsOwedByVolunteerUseCase _getItemsOwedByVolunteerUseCase;
    private readonly GetMovementHistoryUseCase _getMovementHistoryUseCase;
    private readonly GetAllVolunteerPendingReturnsUseCase _getAllVolunteerPendingReturnsUseCase;
    
    public ItemApplicationService(CreateItemUseCase createItemUseCase, 
        UpdateItemUseCase updateItemUseCase, 
        GetItemByIdWithPendingTableUseCase getItemByIdWithPendingTableUseCase, 
        GetInventoryItemsUseCase getInventoryItemsUseCase, 
        ExtractItemUseCase extractItemUseCase, 
        ReturnItemUseCase returnItemUseCase, 
        ExtractBatchItemsUseCase extractBatchItemsUseCase, 
        ReturnBatchItemsUseCase returnBatchItemsUseCase, 
        GetItemByIdUseCase getItemByIdUseCase, 
        GetVolunteerPendingReturnsUseCase getVolunteerPendingReturnsUseCase, 
        GetAllItemsUseCase getAllItemsUseCase, 
        GetItemsOwedByVolunteerUseCase getItemsOwedByVolunteerUseCase, 
        GetMovementHistoryUseCase getMovementHistoryUseCase,
        GetAllVolunteerPendingReturnsUseCase getAllVolunteerPendingReturnsUseCase)
    {
        _createItemUseCase = createItemUseCase;
        _updateItemUseCase = updateItemUseCase;
        _getItemByIdWithPendingTableUseCase = getItemByIdWithPendingTableUseCase;
        _getInventoryItemsUseCase = getInventoryItemsUseCase;
        _extractItemUseCase = extractItemUseCase;
        _returnItemUseCase = returnItemUseCase;
        _extractBatchItemsUseCase = extractBatchItemsUseCase;
        _returnBatchItemsUseCase = returnBatchItemsUseCase;
        _getItemByIdUseCase = getItemByIdUseCase;
        _getVolunteerPendingReturnsUseCase = getVolunteerPendingReturnsUseCase;
        _getAllItemsUseCase = getAllItemsUseCase;
        _getItemsOwedByVolunteerUseCase = getItemsOwedByVolunteerUseCase;
        _getMovementHistoryUseCase = getMovementHistoryUseCase;
        _getAllVolunteerPendingReturnsUseCase = getAllVolunteerPendingReturnsUseCase;
    }
    
    public async Task CreateItemAsync(CreateItemDTO dto, short userId, string userName)
        => await _createItemUseCase.ExecuteAsync(dto, userId, userName);
    
    public async Task UpdateItemAsync(int id, UpdateItemDTO dto, short userId, string userName)
        => await _updateItemUseCase.ExecuteAsync(id, dto, userId, userName);
    
    public async Task<ItemWithPendingTableDTO> GetItemByIdWithPendingTableAsync(int itemId)
        => await _getItemByIdWithPendingTableUseCase.ExecuteAsync(itemId);
    
    public async Task<(IEnumerable<InventoryItemDTO> Data, int TotalPages)> GetInventoryItemsAsync(
        string searchTerm = null,
        bool orderByNameAsc = true,
        int pageIndex = 1,
        int pageSize = 10)
        => await _getInventoryItemsUseCase.ExecuteAsync(searchTerm, orderByNameAsc, pageIndex, pageSize);
    public async Task ExtractItemAsync(InventoryMovementDTO dto, short userId, string userName)
        => await _extractItemUseCase.ExecuteAsync(dto, userId, userName);
    public async Task ReturnItemAsync(InventoryMovementDTO dto, short userId, string userName)
        => await _returnItemUseCase.ExecuteAsync(dto, userId, userName);
    public async Task ExtractBatchItemsAsync(InventoryBatchMovementDTO dto, short userId, string userName)
        => await _extractBatchItemsUseCase.ExecuteAsync(dto, userId, userName);
    public async Task ReturnBatchItemsAsync(InventoryBatchMovementDTO dto, short userId, string userName)
        => await _returnBatchItemsUseCase.ExecuteAsync(dto, userId, userName);
    public async Task<ItemDTO> GetItemByIdAsync(int id)
        => await _getItemByIdUseCase.ExecuteAsync(id);
    public async Task<IEnumerable<VolunteerPendingReturnDTO>> GetVolunteerPendingReturnsAsync(int itemId)
        => await _getVolunteerPendingReturnsUseCase.ExecuteAsync(itemId);
    public async Task<IEnumerable<ItemDTO>> GetAllItemsAsync()
        => await _getAllItemsUseCase.ExecuteAsync();
    public async Task<IEnumerable<ItemDTO>> GetItemsOwedByVolunteerAsync(int volunteerId)
        => await _getItemsOwedByVolunteerUseCase.ExecuteAsync(volunteerId);
    public async Task<(IEnumerable<MovementHistoryDTO> Data, int TotalPages)> GetMovementHistoryAsync(
        string searchTerm = null,
        int? movementType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        int pageIndex = 1,
        int pageSize = 10)
        => await _getMovementHistoryUseCase.ExecuteAsync(searchTerm, movementType, startDate, endDate, pageIndex, pageSize);
    public async Task<IEnumerable<VolunteerWithPendingReturnDTO>> GetAllVolunteerPendingReturnsAsync()
        => await _getAllVolunteerPendingReturnsUseCase.ExecuteAsync();
}