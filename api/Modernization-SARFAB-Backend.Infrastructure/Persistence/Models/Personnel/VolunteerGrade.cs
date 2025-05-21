using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class VolunteerGrade
{
    public int VolunteerGradeId { get; set; }

    public int VolunteerId { get; set; }

    public int GradeId { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Grade Grade { get; set; } = null!;

    public virtual Volunteer Volunteer { get; set; } = null!;
}
