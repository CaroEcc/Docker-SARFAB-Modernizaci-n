using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory;

public class ExtractItemUseCase
{
    private readonly IItemRepository _itemRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILoggingService _loggingService;

    public ExtractItemUseCase(IItemRepository itemRepository, IUnitOfWork unitOfWork, ILoggingService loggingService)
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
            if (request.Quantity <= 0)
                throw new BusinessException("La cantidad a extraer debe ser mayor que 0.");

            var itemEntity = await _itemRepository.GetItemByIdAsync(request.ItemId);
            int totalPending = await _itemRepository.GetTotalPendingAmountAsync(request.ItemId);
            int availableStock = itemEntity.Quantity - totalPending;

            if (request.Quantity > availableStock)
                throw new BusinessException("La cantidad a extraer no puede exceder la existencia disponible.");
            try
            {
                int movementId = await _itemRepository.CreateInventoryMovementAsync(request.VolunteerId, userId);
                await _itemRepository.RegisterMovementDetailAsync(movementId, request.ItemId, request.Quantity, userId, 0);
                await _itemRepository.UpdateVolunteerTrackingAsync(request.VolunteerId, request.ItemId, request.Quantity, userId, 0);
                await _unitOfWork.CommitAsync();
                _loggingService.LogInformation($"Usuario <{userName}> extrajo {request.Quantity} unidad(es) del ítem {request.ItemId} para el voluntario {request.VolunteerId}.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                _loggingService.LogError($"Error al extraer ítem: {ex.Message}");
                throw;
            }
        });
    }
}
