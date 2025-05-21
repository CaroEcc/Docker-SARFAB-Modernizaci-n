using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

public partial class Storage
{
    public int StorageId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<InventoryMovement> InventoryMovements { get; set; } = new List<InventoryMovement>();
}
