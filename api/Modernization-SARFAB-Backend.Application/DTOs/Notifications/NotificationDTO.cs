namespace Modernization_SARFAB_Backend.Application.DTOs.Notifications;

public class NotificationDTO
{
    public int Id { get; set; }
    public int VolunteerId { get; set; }
    public string Message { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int? RelatedEntityId { get; set; }
    public int? DaysBeforeExpiration { get; set; }
    public bool WasRead { get; set; }
    public DateTime SentAt { get; set; }
}