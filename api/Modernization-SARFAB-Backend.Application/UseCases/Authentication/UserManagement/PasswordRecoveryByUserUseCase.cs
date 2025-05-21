using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class PasswordRecoveryByUserUseCase
    {
        private readonly IUserRepository _repository;
        private readonly IEmailService _emailService;
        private readonly ILoggingService _loggingService;

        public PasswordRecoveryByUserUseCase(IUserRepository repository, IEmailService emailService, ILoggingService loggingService)
        {
            _repository = repository;
            _emailService = emailService;
            _loggingService = loggingService;
        }

        public async Task Execute(PasswordRecoveryDTO dto) 
        {
            try
            {
                var user = await _repository.GetByUsernameAsync(dto.UserName);

                if (!user.Email.Equals(dto.Email.Trim(), StringComparison.OrdinalIgnoreCase))
                    throw new BusinessException("Los datos no coinciden");

                string password = Guid.NewGuid().ToString("N").Substring(0, 8);
                var encrypPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var userEntity = new UserEntity
                {
                    Id = user.Id,
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

                _loggingService.LogInformation($"Usuario <{user.Username}> restauró su contraseña");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al restaurar contraseña: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
