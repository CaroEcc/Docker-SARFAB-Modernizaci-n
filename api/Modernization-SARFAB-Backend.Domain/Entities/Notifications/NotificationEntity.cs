using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Notifications;

public class NotificationEntity
{
    public int Id { get; set; }
    public int VolunteerId { get; private set; }
    public string Message { get; private set; }
    public string Type { get; private set; }
    public int? RelatedEntityId { get; private set; }
    public int? DaysBeforeExpiration { get; private set; }
    public bool WasRead { get; set; }
    public DateTime SentAt { get; set; }
    public byte Status { get; set; } = 1;

    public NotificationEntity(int volunteerId, string message, string type, int? relatedEntityId = null, int? daysBeforeExpiration = null)
    {
        if (string.IsNullOrWhiteSpace(message))
            throw new DomainException("El mensaje de la notificación no puede estar vacío.");

        if (string.IsNullOrWhiteSpace(type))
            throw new DomainException("El tipo de notificación no puede estar vacío.");

        VolunteerId = volunteerId;
        Message = message;
        Type = type;
        RelatedEntityId = relatedEntityId;
        DaysBeforeExpiration = daysBeforeExpiration;
        WasRead = false;
        SentAt = DateTime.UtcNow;
        Status = 1;
    }

    public void MarkAsRead()
    {
        WasRead = true;
    }
}