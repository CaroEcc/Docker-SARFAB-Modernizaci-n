using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class CreateUserUseCase
    {
        private readonly IUserRepository _repository;
        private readonly IEmailService _emailService;
        private readonly ILoggingService _loggingService;

        public CreateUserUseCase(IUserRepository repository, IEmailService emailService, ILoggingService loggingService)
        {
            _repository = repository;
            _emailService = emailService;
            _loggingService = loggingService;
        }

        public async Task Execute(CreateUserDTO dto, string userName)
        {
            try
            {
                string password = Guid.NewGuid().ToString("N").Substring(0, 8);
                var encrypPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var userEntity = new UserEntity
                {
                    PersonId = dto.PersonId,
                    Email = dto.Email,
                    Username = dto.UserName,
                    Password = encrypPassword,
                    Role = (sbyte)dto.Role
                };

                var id = await _repository.CreateUserAsync(userEntity);
                var replacements = new Dictionary<string, string>
                {
                    {"{{TITTLE}}", "Contraseña"},
                    { "{{PASSWORD}}", password },
                    { "{{LINK}}", "google.com" } 
                };

                // Obtener la plantilla con los datos reemplazados
                string htmlBody = _emailService.GetHtmlTemplate("PasswordEmailTemplate.html", replacements);

                await _emailService.SendEmailAsync(dto.Email, "Contreseña", htmlBody);

                _loggingService.LogInformation($"Usuario <{userName}> registró un usuario con id {id}");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al crear usuario: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
