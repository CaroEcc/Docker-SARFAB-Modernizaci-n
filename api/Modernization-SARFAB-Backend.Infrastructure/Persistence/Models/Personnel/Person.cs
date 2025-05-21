using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Medical;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Person
{
    public int PersonId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    /// <summary>
    /// 0: Eliminado, 1: Activo
    /// </summary>
    public sbyte? Status { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<InventoryMovement> InventoryMovements { get; set; } = new List<InventoryMovement>();

    public virtual ICollection<MedicalTreatment> MedicalTreatmentAttendingPeople { get; set; } = new List<MedicalTreatment>();

    public virtual ICollection<MedicalTreatment> MedicalTreatmentPatientPeople { get; set; } = new List<MedicalTreatment>();

    public virtual Military? Military { get; set; }

    public virtual ICollection<PersonOperation> PersonOperations { get; set; } = new List<PersonOperation>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
    public virtual ICollection<VolunteerInventoryTracking> VolunteerInventoryTrackings { get; set; } = new List<VolunteerInventoryTracking>();

    public virtual Volunteer? Volunteer { get; set; }
}
