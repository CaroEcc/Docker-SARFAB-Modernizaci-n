using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class Shift
{
    public int ShiftId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Guard> Guards { get; set; } = new List<Guard>();
}
