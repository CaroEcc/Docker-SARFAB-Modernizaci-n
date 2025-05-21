using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;
namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Volunteer
{
    public int VolunteerId { get; set; }

    public string HomeAddress { get; set; } = null!;

    public string Ci { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string? Phone { get; set; }

    public string? MobilePhone { get; set; }

    public string Email { get; set; }

    public string? DistinctiveFeatures { get; set; }

    /// <summary>
    /// Voluntario, Libretista
    /// </summary>
    public string VolunteerType { get; set; } = null!;

    public string? Occupation { get; set; }

    public string? BloodType { get; set; }

    public string? Religion { get; set; }

    public string? Allergies { get; set; }

    public string EmergencyContactFullName { get; set; } = null!;

    public string EmergencyContactRelation { get; set; } = null!;

    public string? EmergencyContactAddress { get; set; }

    public string? EmergencyContactPhone { get; set; }

    public string? EmergencyContactMobile { get; set; }

    public int? DepartmentId { get; set; }

    /// <summary>
    /// 0: Eliminado, 1: Activo, 2: Servicio Cumplido, 3: Baja
    /// </summary>
    public sbyte? Status { get; set; }

    public string? DischargeReason { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<DemeritPoint> DemeritPoints { get; set; } = new List<DemeritPoint>();

    public virtual Department? Department { get; set; }

    public virtual ICollection<MedicalCheckup> MedicalCheckups { get; set; } = new List<MedicalCheckup>();

    public virtual ICollection<VolunteerCourse> VolunteerCourses { get; set; } = new List<VolunteerCourse>();

    public virtual VolunteerGrade? VolunteerGrade { get; set; }

    public virtual ICollection<VolunteerGuard> VolunteerGuards { get; set; } = new List<VolunteerGuard>();

    public virtual Person VolunteerNavigation { get; set; } = null!;
    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
