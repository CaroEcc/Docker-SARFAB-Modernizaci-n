using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class ExtractBatchItemsUseCase
{
    private readonly IItemRepository _itemRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILoggingService _loggingService;

    public ExtractBatchItemsUseCase(IItemRepository itemRepository, IUnitOfWork unitOfWork, ILoggingService loggingService)
    {
        _itemRepository = itemRepository;
        _unitOfWork = unitOfWork;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(InventoryBatchMovementDTO request, short userId, string userName)
    {
        await _unitOfWork.ExecuteWithStrategyAsync(async () =>
        {
            await _unitOfWork.BeginTransactionAsync();
            
            foreach (var item in request.Items)
            {
                if (item.Quantity <= 0)
                    throw new BusinessException($"La cantidad a extraer para el ítem {item.ItemId} debe ser mayor que 0.");

                var itemEntity = await _itemRepository.GetItemByIdAsync(item.ItemId);
                int totalPending = await _itemRepository.GetTotalPendingAmountAsync(item.ItemId);
                int availableStock = itemEntity.Quantity - totalPending;

                if (item.Quantity > availableStock)
                    throw new BusinessException($"La cantidad a extraer para el ítem {item.ItemId} excede la existencia disponible.");
            }
            
            try
            {
                int movementId = await _itemRepository.CreateInventoryMovementAsync(request.VolunteerId, userId);
                await _itemRepository.RegisterBatchMovementDetailsAsync(movementId, request.Items, userId, 0);
                await _itemRepository.UpdateBatchVolunteerTrackingAsync(request.VolunteerId, request.Items, userId, 0);
                await _unitOfWork.CommitAsync();
            
                string itemsExtracted = string.Join(", ", request.Items.Select(i => $"ID:{i.ItemId} x{i.Quantity}"));
                _loggingService.LogInformation($"Usuario <{userName}> registró la extracción de los siguientes ítems para el voluntario {request.VolunteerId}: {itemsExtracted}.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                _loggingService.LogError($"Error al extraer múltiples ítems: {ex.Message}");
                throw;
            }
        });
    }

}
