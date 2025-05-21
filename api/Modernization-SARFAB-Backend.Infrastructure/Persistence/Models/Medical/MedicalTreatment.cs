using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;
using System;
using System.Collections.Generic;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Medical;

public partial class MedicalTreatment
{
    public int TreatmentId { get; set; }

    public DateTime TreatmentDate { get; set; }

    public string Diagnosis { get; set; } = null!;

    public string TreatmentDescription { get; set; } = null!;

    public int AttendingPersonId { get; set; }

    public int PatientPersonId { get; set; }

    public short? UserId { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Person AttendingPerson { get; set; } = null!;

    public virtual Person PatientPerson { get; set; } = null!;
}
