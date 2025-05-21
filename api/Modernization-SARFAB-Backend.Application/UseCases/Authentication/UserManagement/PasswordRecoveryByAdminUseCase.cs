using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class PasswordRecoveryByAdminUseCase
    {
        private readonly IUserRepository _repository;
        private readonly IEmailService _emailService;
        private readonly ILoggingService _loggingService;

        public PasswordRecoveryByAdminUseCase(IUserRepository repository, IEmailService emailService, ILoggingService loggingService)
        {
            _repository = repository;
            _emailService = emailService;
            _loggingService = loggingService;
        }

        public async Task Execute(short id, string userName)
        {
            try
            {
                var user = await _repository.GetUserByUserIdAsync(id);

                string password = Guid.NewGuid().ToString("N").Substring(0, 8);
                var encrypPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var userEntity = new UserEntity
                {
                    Id = id,
                    Password = encrypPassword,
                    FirstLogin = 1
                };

                await _repository.UpdateUserAsync(userEntity);
                var replacements = new Dictionary<string, string>
                {
                    {"{{TITTLE}}", "Recuperación de contraseña"},
                    { "{{PASSWORD}}", password },
                    { "{{LINK}}", "google.com" }
                };

                // Obtener la plantilla con los datos reemplazados
                string htmlBody = _emailService.GetHtmlTemplate("PasswordEmailTemplate.html", replacements);

                await _emailService.SendEmailAsync(user.Email, "Contreseña", htmlBody);

                _loggingService.LogInformation($"Usuario <{userName}> restauró la contraseña de un usuario con id {id}");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al restaurar contraseña: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        } 
    }
}
