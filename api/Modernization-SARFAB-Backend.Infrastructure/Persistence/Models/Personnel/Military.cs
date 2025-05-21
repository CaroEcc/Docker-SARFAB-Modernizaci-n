using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Military
{
    public int MilitaryId { get; set; }

    public string? MobilePhone { get; set; }

    public short? UserId { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Person MilitaryNavigation { get; set; } = null!;

    public virtual MilitaryRankAssignment? MilitaryRankAssignment { get; set; }
}
