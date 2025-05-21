using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Services
{
    public interface ILoggingService
    {
        void LogInformation(string messageTemplate, params object[] propertyValues);
        void LogWarning(string message);
        void LogError(string message, Exception? exception = null);
        void LogAction(string action, string entity, object? details = null);
    }
}
