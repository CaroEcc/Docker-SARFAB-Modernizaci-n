using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class GetUserByIdUseCase
    {
        private readonly IUserRepository _repository;

        public GetUserByIdUseCase(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserDTO> Execute(int id)
        {
            var result = await _repository.GetUserByUserIdAsync(id);
            return result;
        }
    }
}
