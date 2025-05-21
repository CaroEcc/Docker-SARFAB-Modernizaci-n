using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class VolunteerGuard
{
    public int VolunteerId { get; set; }

    public int GuardId { get; set; }

    /// <summary>
    /// Responsable, Voluntario
    /// </summary>
    public string Role { get; set; } = null!;
    public byte Status { get; set; } = 0;

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Guard Guard { get; set; } = null!;

    public virtual Volunteer Volunteer { get; set; } = null!;
}
