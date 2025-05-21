using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;

public partial class Municipality
{
    public int MunicipalityId { get; set; }

    public string Name { get; set; } = null!;

    public int ProvinceId { get; set; }

    public virtual Province Province { get; set; } = null!;

    public virtual ICollection<SarOperation> SarOperations { get; set; } = new List<SarOperation>();
}
