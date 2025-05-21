using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

public partial class Item
{
    public int ItemId { get; set; }

    public string Name { get; set; } = null!;
    public int Quantity { get; set; }

    public short? UserId { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<MovementDetail> MovementDetails { get; set; } = new List<MovementDetail>();
    public virtual ICollection<VolunteerInventoryTracking> VolunteerInventoryTrackings { get; set; } = new List<VolunteerInventoryTracking>();

}
