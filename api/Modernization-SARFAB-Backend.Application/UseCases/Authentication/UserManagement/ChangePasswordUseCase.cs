using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class ChangePasswordUseCase
    {
        private readonly IUserRepository _repository;
        private readonly ILoggingService _loggingService;

        public ChangePasswordUseCase(IUserRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task Execute(UpdatePasswordDTO dto, string userName)
        {
            try
            {
                var encrypPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                var entity = new UserEntity
                {
                    Id = dto.UserId,
                    Password = encrypPassword,
                    FirstLogin = 0
                };

                await _repository.UpdateUserAsync(entity);
                _loggingService.LogInformation($"Usuario <{userName}> cambio la contraseña de un usuario con id {dto.UserId}");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al cambiar contraseña: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
