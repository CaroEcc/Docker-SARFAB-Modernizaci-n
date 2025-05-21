using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class UpdateUserStatusUseCase
    {
        private readonly IUserRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateUserStatusUseCase(IUserRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task Execute(short id, byte status, string userName)
        {
            try
            {
                var entity = new UserEntity
                {
                    Id = id,
                    Status = (sbyte)status
                };

                await _repository.UpdateUserAsync(entity);
                _loggingService.LogInformation($"Usuario <{userName}> eliminó a un usuario con id {id}");
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"Error al eliminar usuario: {ex.Message}", ex);
                throw new BusinessException(ex.Message);
            }
        }
    }
}
