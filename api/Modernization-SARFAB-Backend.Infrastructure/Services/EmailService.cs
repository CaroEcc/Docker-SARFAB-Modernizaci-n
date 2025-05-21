using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
namespace Modernization_SARFAB_Backend.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var emailSettings = _configuration.GetSection("SmtpSettings");

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Soporte", emailSettings["Username"]));
            email.To.Add(new MailboxAddress("", to));
            email.Subject = subject;

            email.Body = new TextPart("html") { Text = body };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(emailSettings["Host"], int.Parse(emailSettings["Port"]), MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(emailSettings["Username"], emailSettings["Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        public string GetHtmlTemplate(string templateName, Dictionary<string, string> replacements)
        {
            // Obtener la ruta base del proyecto de Infraestructura
            string basePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Templates", "EmailTemplates");

            // Ruta completa del archivo HTML
            string path = Path.Combine(basePath, templateName);

            if (!File.Exists(path))
                return "<p>Error: La plantilla no fue encontrada.</p>";

            string htmlContent = File.ReadAllText(path);

            foreach (var item in replacements)
            {
                htmlContent = htmlContent.Replace(item.Key, item.Value);
            }

            return htmlContent;
        }

    }
}
