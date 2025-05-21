using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Modernization_SARFAB_Backend.Application.Services.Notifications;

namespace Modernization_SARFAB_Backend.Infrastructure.Services.Background;

public class NotificationBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<NotificationBackgroundService> _logger;
    private readonly TimeSpan _interval = TimeSpan.FromHours(24);

    public NotificationBackgroundService(IServiceProvider serviceProvider, ILogger<NotificationBackgroundService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Notification background service started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                try
                {
                    var notificationService = scope.ServiceProvider.GetRequiredService<NotificationApplicationService>();
                    await notificationService.VerifyAllAsync();

                    _logger.LogInformation("Notification verification completed successfully.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error during notification verification.");
                }
            }

            await Task.Delay(_interval, stoppingToken);
        }

        _logger.LogInformation("Notification background service stopped.");
    }
}