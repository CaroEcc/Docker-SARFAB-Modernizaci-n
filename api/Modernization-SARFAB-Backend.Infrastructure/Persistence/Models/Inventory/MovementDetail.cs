using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

public partial class MovementDetail
{
    public int MovementId { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    /// <summary>
    /// 0: Salida, 1: Devolución
    /// </summary>
    public sbyte MovementType { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual InventoryMovement Movement { get; set; } = null!;
}
