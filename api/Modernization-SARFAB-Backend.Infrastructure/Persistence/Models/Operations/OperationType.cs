using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class OperationType
{
    public int OperationTypeId { get; set; }

    public string Name { get; set; } = null!;

    public int OperationCategoryId { get; set; }

    public virtual OperationCategory OperationCategory { get; set; } = null!;

    public virtual ICollection<SarOperation> SarOperations { get; set; } = new List<SarOperation>();
}
