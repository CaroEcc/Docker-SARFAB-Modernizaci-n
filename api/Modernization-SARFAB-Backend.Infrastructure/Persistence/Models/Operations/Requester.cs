using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class Requester
{
    public int RequesterId { get; set; }

    public string Name { get; set; } = null!;

    public string? Phone { get; set; }

    public string? MobilePhone { get; set; }

    /// <summary>
    /// 0: Eliminado, 1: Activo
    /// </summary>
    public sbyte? Status { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<SarOperation> SarOperations { get; set; } = new List<SarOperation>();
}
