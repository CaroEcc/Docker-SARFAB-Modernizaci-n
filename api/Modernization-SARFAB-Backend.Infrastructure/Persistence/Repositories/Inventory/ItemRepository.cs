using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Domain.Entities.Inventory;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;
using Microsoft.EntityFrameworkCore;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Inventory;

public class ItemRepository : IItemRepository
{
    private readonly SARFABSystemDbContext _context;

    public ItemRepository(SARFABSystemDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateItemAsync(ItemEntity item)
    {
        var itemModel = new Item
        {
            Name = item.Name,
            Quantity = item.Quantity,
            UserId = item.UserId
        };
        await _context.Items.AddAsync(itemModel);
        await _context.SaveChangesAsync();
        return itemModel.ItemId;
    }

    public async Task UpdateItemAsync(ItemEntity item)
    {
        var itemModel = await _context.Items.FindAsync(item.ItemId);
        itemModel.Name = item.Name;
        itemModel.Quantity = item.Quantity;
        await _context.SaveChangesAsync();
    }

    public async Task<ItemEntity> GetItemByIdAsync(int id)
    {
        var itemModel = await _context.Items.FindAsync(id);
        return new ItemEntity(
            itemModel.ItemId,
            itemModel.Name,
            itemModel.Quantity
        );
    }

    public async Task<IEnumerable<VolunteerPendingReturnDTO>> GetVolunteerPendingReturnsAsync(int itemId)
    {
        var result = await _context.VolunteerInventoryTrackings
            .Where(vit => vit.PendingAmount > 0 && vit.ItemId == itemId)
            .Select(vit => new VolunteerPendingReturnDTO
            {
                VolunteerId = vit.PersonId,
                VolunteerWithGrade = _context.Volunteers
                    .Where(v => v.VolunteerNavigation.PersonId == vit.PersonId)
                    .Select(v => v.VolunteerGrade.Grade.Abbreviation + " " +
                                 v.VolunteerNavigation.LastName + " " +
                                 v.VolunteerNavigation.FirstName)
                    .FirstOrDefault(),
                Quantity = vit.PendingAmount
            })
            .ToListAsync();
        return result;
    }

    public async Task<(IEnumerable<InventoryItemDTO> Data, int TotalPages)> GetInventoryItemsAsync(
        string searchTerm = null,
        bool orderByNameAsc = true,
        int pageIndex = 1,
        int pageSize = 10)
    {
        var query = _context.Items
            .Select(item => new InventoryItemDTO
            {
                ItemId = item.ItemId,
                Name = item.Name,
                TotalStock = item.Quantity,
                AssignedQuantity = item.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount),
                AvailableQuantity = item.Quantity - item.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount)
            });

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(i => i.Name.Contains(searchTerm));
        }

        query = orderByNameAsc
            ? query.OrderBy(i => i.Name)
            : query.OrderByDescending(i => i.Name);

        var totalRecords = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

        var items = await query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalPages);
    }
    
    public async Task<int> CreateInventoryMovementAsync(int volunteerId, short userId)
    {
        var movement = new InventoryMovement
        {
            PersonId = volunteerId,
            StorageId = 1,
            MovementDate = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            UserId = userId
        };

        await _context.InventoryMovements.AddAsync(movement);
        await _context.SaveChangesAsync();

        return movement.MovementId;
    }

    public async Task RegisterMovementDetailAsync(int movementId, int itemId, int quantity, short userId, short movementType)
    {
        var item = await _context.Items
            .Include(i => i.VolunteerInventoryTrackings)
            .FirstOrDefaultAsync(i => i.ItemId == itemId);

        if (item == null)
            throw new InvalidOperationException("El ítem no existe.");
        
        if (movementType == 0)
        {
            int availableQuantity = item.Quantity - item.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount);

            if (availableQuantity < quantity)
            {
                throw new InvalidOperationException("Stock insuficiente para la extracción.");
            }
        }

        var detail = new MovementDetail
        {
            MovementId = movementId,
            ItemId = itemId,
            Quantity = quantity,
            MovementType = (sbyte)movementType,
            CreatedAt = DateTime.UtcNow,
            UserId = userId
        };
        _context.MovementDetails.Add(detail);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateVolunteerTrackingAsync(int volunteerId, int itemId, int quantity, short userId, short movementType)
    {
        var tracking = await _context.VolunteerInventoryTrackings
            .FirstOrDefaultAsync(vit => vit.PersonId == volunteerId && vit.ItemId == itemId);

        if (tracking != null)
        {
            tracking.PendingAmount += (movementType == 0) ? quantity : -quantity;
            tracking.UpdatedAt = DateTime.UtcNow;
            tracking.UserId = userId;
        }
        else if (movementType == 0)
        {
            tracking = new VolunteerInventoryTracking
            {
                PersonId = volunteerId,
                ItemId = itemId,
                PendingAmount = quantity,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };

            _context.VolunteerInventoryTrackings.Add(tracking);
        }

        await _context.SaveChangesAsync();
    }
    public async Task RegisterBatchMovementDetailsAsync(int movementId, List<MovementDetailDTO> items, short userId, short movementType)
    {
        var movementDetails = new List<MovementDetail>();

        foreach (var item in items)
        {
            var dbItem = await _context.Items
                .Include(i => i.VolunteerInventoryTrackings)
                .FirstOrDefaultAsync(i => i.ItemId == item.ItemId);

            if (dbItem == null)
                throw new InvalidOperationException($"El ítem {item.ItemId} no existe.");

            if (movementType == 0)
            {
                int availableQuantity = dbItem.Quantity - dbItem.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount);
                if (availableQuantity < item.Quantity)
                    throw new InvalidOperationException($"Stock insuficiente para el ítem {item.ItemId}.");
            }

            movementDetails.Add(new MovementDetail
            {
                MovementId = movementId,
                ItemId = item.ItemId,
                Quantity = item.Quantity,
                MovementType = (sbyte)movementType,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            });
        }

        await _context.MovementDetails.AddRangeAsync(movementDetails);
        await _context.SaveChangesAsync();
    }
    
    public async Task UpdateBatchVolunteerTrackingAsync(int volunteerId, List<MovementDetailDTO> items, short userId, short movementType)
    {
        foreach (var item in items)
        {
            var tracking = await _context.VolunteerInventoryTrackings
                .FirstOrDefaultAsync(vit => vit.PersonId == volunteerId && vit.ItemId == item.ItemId);

            if (tracking != null)
            {
                tracking.PendingAmount += (movementType == 0) ? item.Quantity : -item.Quantity;
                tracking.UpdatedAt = DateTime.UtcNow;
                tracking.UserId = userId;
            }
            else if (movementType == 0)
            {
                tracking = new VolunteerInventoryTracking
                {
                    PersonId = volunteerId,
                    ItemId = item.ItemId,
                    PendingAmount = item.Quantity,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                _context.VolunteerInventoryTrackings.Add(tracking);
            }
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task<int> GetPendingReturnAmountAsync(int volunteerId, int itemId)
    {
        return await _context.VolunteerInventoryTrackings
            .Where(vit => vit.PersonId == volunteerId && vit.ItemId == itemId)
            .Select(vit => vit.PendingAmount)
            .FirstOrDefaultAsync();
    }
    
    public async Task<IEnumerable<ItemDTO>> GetAllItemsAsync()
    {
        return await _context.Items
            .Where(i => (i.Quantity - i.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount)) > 0)
            .Select(i => new ItemDTO
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Quantity =i.Quantity,
                AvailableQuantity = i.Quantity - i.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount),
                AssignedQuantity = i.VolunteerInventoryTrackings.Sum(vit => vit.PendingAmount)
            })
            .ToListAsync();
    }

    
    public async Task<IEnumerable<ItemDTO>> GetItemsOwedByVolunteerAsync(int volunteerId)
    {
        var result = await (
            from vit in _context.VolunteerInventoryTrackings
            join i in _context.Items on vit.ItemId equals i.ItemId
            where vit.PersonId == volunteerId && vit.PendingAmount > 0
            select new ItemDTO
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Quantity = vit.PendingAmount
            }
        ).ToListAsync();

        return result;
    }
    
    public async Task<(IEnumerable<MovementHistoryDTO> Data, int TotalPages)> GetMovementHistoryAsync(
    string searchTerm = null,
    int? movementType = null,
    DateTime? startDate = null,
    DateTime? endDate = null,
    int pageIndex = 1,
    int pageSize = 10)
    {
        var query = from md in _context.MovementDetails
                    join im in _context.InventoryMovements on md.MovementId equals im.MovementId
                    join i in _context.Items on md.ItemId equals i.ItemId
                    join v in _context.Volunteers on im.PersonId equals v.VolunteerNavigation.PersonId
                    select new MovementHistoryDTO
                    {
                        VolunteerName = v.VolunteerGrade.Grade.Abbreviation + " " +
                                        v.VolunteerNavigation.LastName + " " +
                                        v.VolunteerNavigation.FirstName,
                        ItemName = i.Name,
                        MovementDate = im.MovementDate,
                        Action = md.MovementType == 0 ? "Extracción" : "Devolución",
                        Quantity = md.Quantity
                    };

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(x => x.VolunteerName.Contains(searchTerm) ||
                                     x.ItemName.Contains(searchTerm));
        }

        if (movementType.HasValue)
        {
            query = query.Where(x => (movementType.Value == 0 && x.Action == "Extracción") ||
                                     (movementType.Value == 1 && x.Action == "Devolución"));
        }

        if (startDate.HasValue && endDate.HasValue)
        {
            var startDateValue = startDate.Value.Date;
            var endDateValue = endDate.Value.Date.AddDays(1).AddSeconds(-1);
    
            query = query.Where(x => x.MovementDate >= startDateValue && x.MovementDate <= endDateValue);
        }

        query = query.OrderByDescending(x => x.MovementDate);

        var totalRecords = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

        var data = await query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (data, totalPages);
    }
    public async Task<int> GetTotalPendingAmountAsync(int itemId)
    {
        return await _context.VolunteerInventoryTrackings
            .Where(vit => vit.ItemId == itemId)
            .SumAsync(vit => vit.PendingAmount);
    }
    
    public async Task<IEnumerable<VolunteerWithPendingReturnDTO>> GetAllVolunteerPendingReturnsAsync()
    {
        var result = await _context.VolunteerInventoryTrackings
            .Where(vit => vit.PendingAmount > 0)
            .Select(vit => vit.PersonId)
            .Distinct()
            .Select(personId => new VolunteerWithPendingReturnDTO
            {
                VolunteerId = personId,
                VolunteerWithGrade = _context.Volunteers
                    .Where(v => v.VolunteerNavigation.PersonId == personId)
                    .Select(v => v.VolunteerGrade.Grade.Abbreviation + " " +
                                 v.VolunteerNavigation.LastName + " " +
                                 v.VolunteerNavigation.FirstName)
                    .FirstOrDefault()
            })
            .ToListAsync();

        return result;
    }
    
    public async Task<int> GetAssignedQuantityAsync(int itemId)
    {
        return await _context.VolunteerInventoryTrackings
            .Where(vit => vit.ItemId == itemId)
            .SumAsync(vit => (int?)vit.PendingAmount) ?? 0;
    }
}