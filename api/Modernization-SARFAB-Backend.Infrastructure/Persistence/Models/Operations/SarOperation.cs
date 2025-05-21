using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class SarOperation
{
    public int OperationId { get; set; }

    public string Address { get; set; } = null!;

    public DateTime DepartureDate { get; set; }

    public DateTime? ArrivalDate { get; set; }
    public string? Observations { get; set; }

    public int OperationTypeId { get; set; }

    public int MunicipalityId { get; set; }

    public int RequesterId { get; set; }

    /// <summary>
    /// 0: Eliminado, 1: Activo
    /// </summary>
    public sbyte? Status { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Municipality Municipality { get; set; } = null!;

    public virtual OperationType OperationType { get; set; } = null!;

    public virtual ICollection<PersonOperation> PersonOperations { get; set; } = new List<PersonOperation>();

    public virtual Requester Requester { get; set; } = null!;
}
