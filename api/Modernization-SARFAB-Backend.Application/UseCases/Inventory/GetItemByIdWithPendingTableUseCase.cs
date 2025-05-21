using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.Application.UseCases.Inventory
{
    public class GetItemByIdWithPendingTableUseCase
    {
        private readonly IItemRepository _repository;

        public GetItemByIdWithPendingTableUseCase(IItemRepository repository)
        {
            _repository = repository;
        }

        public async Task<ItemWithPendingTableDTO> ExecuteAsync(int itemId)
        {
            var item = await _repository.GetItemByIdAsync(itemId);
            if (item == null)
                throw new BusinessException("Item no encontrado");

            var pendingReturns = await _repository.GetVolunteerPendingReturnsAsync(itemId);

            return new ItemWithPendingTableDTO
            {
                ItemId = item.ItemId,
                Name = item.Name,
                TotalQuantity = item.Quantity,
                PendingReturns = pendingReturns.ToList()
            };
        }
    }
}