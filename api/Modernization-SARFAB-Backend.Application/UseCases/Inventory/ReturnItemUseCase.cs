using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class ReturnItemUseCase
{
    private readonly IItemRepository _itemRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILoggingService _loggingService;

    public ReturnItemUseCase(IItemRepository itemRepository, IUnitOfWork unitOfWork, ILoggingService loggingService)
    {
        _itemRepository = itemRepository;
        _unitOfWork = unitOfWork;
        _loggingService = loggingService;
    }

    public async Task ExecuteAsync(InventoryMovementDTO request, short userId, string userName)
    {
        await _unitOfWork.ExecuteWithStrategyAsync(async () =>
        {
            await _unitOfWork.BeginTransactionAsync();
            var pendingAmount = await _itemRepository.GetPendingReturnAmountAsync(request.VolunteerId, request.ItemId);
            if (request.Quantity <= 0)
                throw new BusinessException("La cantidad a devolver debe ser mayor que 0.");
            if (request.Quantity > pendingAmount)
                throw new BusinessException("La cantidad a devolver no puede ser mayor que la cantidad pendiente.");

            try
            {
                int movementId = await _itemRepository.CreateInventoryMovementAsync(request.VolunteerId, userId);
                await _itemRepository.RegisterMovementDetailAsync(movementId, request.ItemId, request.Quantity, userId, 1);
                await _itemRepository.UpdateVolunteerTrackingAsync(request.VolunteerId, request.ItemId, request.Quantity, userId, 1);
                await _unitOfWork.CommitAsync();
            
                _loggingService.LogInformation($"Usuario <{userName}> devolvió {request.Quantity} unidad(es) del ítem {request.ItemId} para el voluntario {request.VolunteerId}.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                _loggingService.LogError($"Error al devolver ítem: {ex.Message}");
                throw;
            }
        });
    }

}
