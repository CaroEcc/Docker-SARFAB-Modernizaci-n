using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

public partial class InventoryMovement
{
    public int MovementId { get; set; }

    public int PersonId { get; set; }

    public int StorageId { get; set; }

    public DateTime MovementDate { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<MovementDetail> MovementDetails { get; set; } = new List<MovementDetail>();

    public virtual Person Person { get; set; } = null!;

    public virtual Storage Storage { get; set; } = null!;
}
