using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class DemeritPoint
{
    public int DemeritId { get; set; }

    public int VolunteerId { get; set; }

    public int PointsLost { get; set; }

    /// <summary>
    /// Falta_Guardia, Falta_Operativo
    /// </summary>
    public string Reason { get; set; } = null!;

    public DateOnly Date { get; set; }

    public string? Observation { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Volunteer Volunteer { get; set; } = null!;
}
