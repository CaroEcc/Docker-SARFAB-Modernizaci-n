using Modernization_SARFAB_Backend.Domain.Entities.Notifications;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Notifications;

public interface INotificationRepository
{
    Task<IEnumerable<NotificationEntity>> GetAllAsync();
    Task<IEnumerable<NotificationEntity>> GetUnreadAsync();
    Task<IEnumerable<NotificationEntity>> GetByVolunteerIdAsync(int volunteerId);
    Task<NotificationEntity?> GetByIdAsync(int id);
    Task<bool> ExistsSimilarNotificationAsync(int volunteerId, string type, int? relatedEntityId, int? daysBeforeExpiration);
    Task AddAsync(NotificationEntity notification);
    Task UpdateAsync(NotificationEntity notification);
    Task SaveChangesAsync();
    Task DeleteAsync(int id);
}