using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Notifications;
using Modernization_SARFAB_Backend.Application.Interfaces.Notifications;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Notifications;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly INotificationRepository _notificationRepository;

    public NotificationController(INotificationRepository notificationRepository)
    {
        _notificationRepository = notificationRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _notificationRepository.GetAllAsync();

        var result = entities.Select(n => new NotificationDTO
        {
            Id = n.Id,
            VolunteerId = n.VolunteerId,
            Message = n.Message,
            Type = n.Type,
            RelatedEntityId = n.RelatedEntityId,
            DaysBeforeExpiration = n.DaysBeforeExpiration,
            WasRead = n.WasRead,
            SentAt = n.SentAt
        });

        return Ok(result);
    }

    [HttpPatch("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var notification = await _notificationRepository.GetByIdAsync(id);

        if (notification is null)
            return NotFound(new { message = "Notification not found." });

        notification.MarkAsRead();
        await _notificationRepository.UpdateAsync(notification);
        await _notificationRepository.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread()
    {
        var entities = await _notificationRepository.GetUnreadAsync();

        var result = entities.Select(n => new NotificationDTO
        {
            Id = n.Id,
            VolunteerId = n.VolunteerId,
            Message = n.Message,
            Type = n.Type,
            RelatedEntityId = n.RelatedEntityId,
            DaysBeforeExpiration = n.DaysBeforeExpiration,
            WasRead = n.WasRead,
            SentAt = n.SentAt
        });

        return Ok(result);
    }
    
    [HttpPatch("{id}/delete")]
    public async Task<IActionResult> SoftDelete(int id)
    {
        var notification = await _notificationRepository.GetByIdAsync(id);

        if (notification is null)
            return NotFound(new { message = "Notification not found." });

        await _notificationRepository.DeleteAsync(id);
        await _notificationRepository.SaveChangesAsync();

        return NoContent();
    }
}