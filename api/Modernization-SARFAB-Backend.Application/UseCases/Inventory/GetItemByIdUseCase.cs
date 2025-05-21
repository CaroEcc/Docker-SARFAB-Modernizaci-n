using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetItemByIdUseCase
{
    private readonly IItemRepository _repository;
    
    public GetItemByIdUseCase(IItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<ItemDTO> ExecuteAsync(int id)
    {
        var entity = await _repository.GetItemByIdAsync(id);
        var assigned = await _repository.GetAssignedQuantityAsync(id);

        return new ItemDTO
        {
            ItemId = entity.ItemId,
            Name = entity.Name,
            Quantity = entity.Quantity,
            AssignedQuantity = assigned,
            AvailableQuantity = entity.Quantity - assigned
        };
    }
}