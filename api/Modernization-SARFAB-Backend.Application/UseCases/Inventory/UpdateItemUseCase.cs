using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class UpdateItemUseCase
{
    private readonly IItemRepository _repository;
    private readonly ILoggingService _loggingService;
    
    public UpdateItemUseCase(
        IItemRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }
    
    public async Task ExecuteAsync(int id, UpdateItemDTO dto, short userId, string userName)
    {
        try
        {
            var itemEntity = await _repository.GetItemByIdAsync(id);
            if (itemEntity == null)
                throw new BusinessException("Item no encontrado");
            itemEntity.UpdateDetails(dto.Name, dto.Quantity);
            await _repository.UpdateItemAsync(itemEntity);
            _loggingService.LogInformation($"El usuario <{userName}> actualizo un elemento con Id {itemEntity.ItemId}.");
        }
        catch (Exception)
        {
            throw new BusinessException("Error al actualizar el item.");
        }
    }
}