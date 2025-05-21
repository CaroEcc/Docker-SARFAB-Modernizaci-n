using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class OperationCategory
{
    public int OperationCategoryId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<OperationType> OperationTypes { get; set; } = new List<OperationType>();
}
