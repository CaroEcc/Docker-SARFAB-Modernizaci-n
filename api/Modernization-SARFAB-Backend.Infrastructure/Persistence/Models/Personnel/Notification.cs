namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Notification
{
    public int Id { get; set; }
    public int VolunteerId { get; set; }
    public string Message { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int? RelatedEntityId { get; set; }
    public int? DaysBeforeExpiration { get; set; }
    public bool WasRead { get; set; }
    public DateTime SentAt { get; set; }
    public byte Status { get; set; } = 1;

    public virtual Volunteer Volunteer { get; set; } = null!;
}