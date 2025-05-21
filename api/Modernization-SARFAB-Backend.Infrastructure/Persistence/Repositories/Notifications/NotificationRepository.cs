using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Interfaces.Notifications;
using Modernization_SARFAB_Backend.Domain.Entities.Notifications;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;


namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Notifications;

public class NotificationRepository : INotificationRepository
    {
        private readonly SARFABSystemDbContext _context;

        public NotificationRepository(SARFABSystemDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NotificationEntity>> GetAllAsync()
        {
            return (await _context.Notifications
                    .Where(n => n.Status == 1)
                    .ToListAsync())
                .Select(MapToEntity);
        }

        public async Task<IEnumerable<NotificationEntity>> GetUnreadAsync()
        {
            var data = await _context.Notifications
                .Where(n => !n.WasRead && n.Status == 1)
                .ToListAsync();

            return data.Select(MapToEntity);
        }


        public async Task<IEnumerable<NotificationEntity>> GetByVolunteerIdAsync(int volunteerId)
        {
            var data = await _context.Notifications
                .Where(n => n.VolunteerId == volunteerId && n.Status == 1)
                .ToListAsync();

            return data.Select(MapToEntity);
        }

        public async Task<NotificationEntity?> GetByIdAsync(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            return notification == null ? null : MapToEntity(notification);
        }

        public async Task<bool> ExistsSimilarNotificationAsync(int volunteerId, string type, int? relatedEntityId, int? daysBeforeExpiration)
        {
            return await _context.Notifications.AnyAsync(n =>
                n.VolunteerId == volunteerId &&
                n.Type == type &&
                n.RelatedEntityId == relatedEntityId &&
                n.DaysBeforeExpiration == daysBeforeExpiration);
        }

        public async Task AddAsync(NotificationEntity entity)
        {
            var model = new Notification
            {
                VolunteerId = entity.VolunteerId,
                Message = entity.Message,
                Type = entity.Type,
                RelatedEntityId = entity.RelatedEntityId,
                DaysBeforeExpiration = entity.DaysBeforeExpiration,
                WasRead = entity.WasRead,
                SentAt = entity.SentAt,
                Status = 1
            };

            await _context.Notifications.AddAsync(model);
        }

        public Task UpdateAsync(NotificationEntity entity)
        {
            var existing = _context.Notifications.FirstOrDefault(n => n.Id == entity.Id);
            if (existing != null)
            {
                existing.WasRead = entity.WasRead;
            }

            return Task.CompletedTask;
        }
        
        public async Task DeleteAsync(int id)
        {
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);
            if (notification != null)
            {
                notification.Status = 0;
                await _context.SaveChangesAsync();
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        private static NotificationEntity MapToEntity(Notification model)
        {
            return new NotificationEntity(
                volunteerId: model.VolunteerId,
                message: model.Message,
                type: model.Type,
                relatedEntityId: model.RelatedEntityId,
                daysBeforeExpiration: model.DaysBeforeExpiration
            )
            {
                Id = model.Id,
                WasRead = model.WasRead,
                SentAt = model.SentAt,
                Status = model.Status
            };
        }
    }