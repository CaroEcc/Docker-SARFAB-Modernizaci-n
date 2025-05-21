namespace Modernization_SARFAB_Backend.Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        string GetHtmlTemplate(string templateName, Dictionary<string, string> replacements);
    }
}
