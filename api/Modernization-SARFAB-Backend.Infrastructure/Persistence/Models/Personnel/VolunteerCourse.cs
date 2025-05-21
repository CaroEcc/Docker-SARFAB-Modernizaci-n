using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class VolunteerCourse
{
    public int VolunteerId { get; set; }

    public int CourseId { get; set; }

    public DateOnly CompletionDate { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Volunteer Volunteer { get; set; } = null!;
}
