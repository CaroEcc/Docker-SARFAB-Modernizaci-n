namespace Modernization_SARFAB_Backend.Application.DTOs.Notifications;

public class CreateNotificationDTO
{
    public int VolunteerId { get; set; }
    public string Message { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int? RelatedEntityId { get; set; }
    public int? DaysBeforeExpiration { get; set; }
}