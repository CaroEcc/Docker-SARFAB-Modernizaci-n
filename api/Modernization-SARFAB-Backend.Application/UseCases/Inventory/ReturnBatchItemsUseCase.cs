using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class ReturnBatchItemsUseCase
{
    private readonly IItemRepository _itemRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILoggingService _loggingService;

    public ReturnBatchItemsUseCase(IItemRepository itemRepository, IUnitOfWork unitOfWork, ILoggingService loggingService)
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
                var pendingAmount = await _itemRepository.GetPendingReturnAmountAsync(request.VolunteerId, item.ItemId);
                if (item.Quantity <= 0)
                    throw new BusinessException($"La cantidad a devolver para el ítem {item.ItemId} debe ser mayor que 0.");
                if (item.Quantity > pendingAmount)
                    throw new BusinessException($"La cantidad a devolver para el ítem {item.ItemId} no puede ser mayor que la pendiente ({pendingAmount}).");
            }
            try
            {
                int movementId = await _itemRepository.CreateInventoryMovementAsync(request.VolunteerId, userId);
                await _itemRepository.RegisterBatchMovementDetailsAsync(movementId, request.Items, userId, 1);
                await _itemRepository.UpdateBatchVolunteerTrackingAsync(request.VolunteerId, request.Items, userId, 1);
                await _unitOfWork.CommitAsync();
            
                string itemsReturned = string.Join(", ", request.Items.Select(i => $"ID:{i.ItemId} x{i.Quantity}"));
                _loggingService.LogInformation($"Usuario <{userName}> registró la devolución de los siguientes ítems para el voluntario {request.VolunteerId}: {itemsReturned}.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                _loggingService.LogError($"Error al devolver múltiples ítems: {ex.Message}");
                throw;
            }
        });
    }

}
