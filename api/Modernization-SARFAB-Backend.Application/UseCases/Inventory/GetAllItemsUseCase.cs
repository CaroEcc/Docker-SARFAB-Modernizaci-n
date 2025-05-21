using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class GetAllItemsUseCase
{
    private readonly IItemRepository _repository;
    
    public GetAllItemsUseCase(IItemRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<ItemDTO>> ExecuteAsync()
    {
        return await _repository.GetAllItemsAsync();
    }
}