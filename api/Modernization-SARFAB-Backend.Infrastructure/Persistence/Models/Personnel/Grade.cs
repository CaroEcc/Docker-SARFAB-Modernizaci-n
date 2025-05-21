using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Grade
{
    public int GradeId { get; set; }

    public string Name { get; set; } = null!;
    public string Abbreviation { get; set; } = null!;

    public virtual ICollection<VolunteerGrade> VolunteerGrades { get; set; } = new List<VolunteerGrade>();
}
