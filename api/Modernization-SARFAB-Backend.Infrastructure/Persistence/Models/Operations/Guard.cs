using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class Guard
{
    public int GuardId { get; set; }

    public DateOnly GuardDate { get; set; }

    public string Location { get; set; } = null!;

    public int ShiftId { get; set; }

    public string? Observations { get; set; }

    public short? UserId { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Shift Shift { get; set; } = null!;

    public virtual ICollection<VolunteerGuard> VolunteerGuards { get; set; } = new List<VolunteerGuard>();
}
