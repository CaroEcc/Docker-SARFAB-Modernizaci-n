using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class UpdateUserUseCase
    {
        private readonly IUserRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateUserUseCase(IUserRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task Execute(UpdateUserDTO dto, string userName)
        {
            try
            {
                var entity = new UserEntity
                {
                    Id = dto.UserId,
                    Email = dto.Email
                };

                await _repository.UpdateUserAsync(entity);
                _loggingService.LogInformation($"Usuario <{userName}> actualizó datos de usuario con id {dto.UserId}");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al actualizar usuario: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
