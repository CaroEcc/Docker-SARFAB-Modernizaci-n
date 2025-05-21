using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Inventory;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class CreateItemUseCase
{
    private readonly IItemRepository _repository;
    private readonly ILoggingService _loggingService;
    
    public CreateItemUseCase(
        IItemRepository repository,
        ILoggingService loggingService)
    {
        _repository = repository;
        _loggingService = loggingService;
    }
    
    public async Task ExecuteAsync(CreateItemDTO dto, short userId, string userName)
    {
        try
        {
            var itemEntity = new ItemEntity(
                dto.Name,
                dto.Quantity,
                userId
            );
            
            var itemId = await _repository.CreateItemAsync(itemEntity);
            _loggingService.LogInformation($"El usuario <{userName}> creo un elemento con Id: {itemId}.");
        }
        catch (Exception)
        {
            throw new BusinessException("Error al crear el item.");
        }
    }
}