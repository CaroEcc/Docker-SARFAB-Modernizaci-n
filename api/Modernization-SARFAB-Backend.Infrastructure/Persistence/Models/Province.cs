using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;

public partial class Province
{
    public int ProvinceId { get; set; }

    public string Name { get; set; } = null!;

    public int DepartmentId { get; set; }

    public virtual Department Department { get; set; } = null!;

    public virtual ICollection<Municipality> Municipalities { get; set; } = new List<Municipality>();
}
