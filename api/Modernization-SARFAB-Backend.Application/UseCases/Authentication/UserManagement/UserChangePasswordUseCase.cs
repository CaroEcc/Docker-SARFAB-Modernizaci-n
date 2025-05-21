using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class UserChangePasswordUseCase
    {
        private readonly IUserRepository _repository;
        private readonly ILoggingService _loggingService;

        public UserChangePasswordUseCase(IUserRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task Execute(ChangePasswordDTO dto)
        {
            try
            {
                var user = await _repository.GetByUsernameAsync(dto.UserName);

                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.LastPassword, user.Password))
                    throw new BusinessException("Credenciales inválidas");

                var encrypPassword = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
                var entity = new UserEntity
                {
                    Id = user.Id,
                    Password = encrypPassword
                };

                await _repository.UpdateUserAsync(entity);
                _loggingService.LogInformation($"Usuario <{user.Username}> cambio su contraseña");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al cambiar contraseña: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
