using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

public partial class PersonOperation
{
    public int PersonId { get; set; }

    public int OperationId { get; set; }

    /// <summary>
    /// Encargado, Voluntario
    /// </summary>
    public string Role { get; set; } = null!;
    public byte Status { get; set; } = 0;

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual SarOperation Operation { get; set; } = null!;

    public virtual Person Person { get; set; } = null!;
}
