using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Serilog;

namespace Modernization_SARFAB_Backend.Infrastructure.Services
{
    
    

    public class LoggingService : ILoggingService
    {
        public void LogInformation(string messageTemplate, params object[] propertyValues)
        => Log.Information(messageTemplate, propertyValues);

        public void LogWarning(string message) => Log.Warning(message);

        public void LogError(string message, Exception? exception = null) => Log.Error(exception, message);

        public void LogAction(string action, string entity, object? details = null)
        {
            Log.Information("Action: {Action}, Entity: {Entity}, Details: {@Details}", action, entity, details);
        }
    }
}
