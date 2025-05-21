using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Province> Provinces { get; set; } = new List<Province>();

    public virtual ICollection<Volunteer> Volunteers { get; set; } = new List<Volunteer>();
}
