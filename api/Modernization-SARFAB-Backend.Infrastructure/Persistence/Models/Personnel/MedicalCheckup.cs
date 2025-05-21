using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class MedicalCheckup
{
    public int CheckupId { get; set; }

    public int VolunteerId { get; set; }

    public DateOnly CheckupDate { get; set; }

    public DateOnly ExpirationDate { get; set; }

    public string? Observations { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Volunteer Volunteer { get; set; } = null!;
}
