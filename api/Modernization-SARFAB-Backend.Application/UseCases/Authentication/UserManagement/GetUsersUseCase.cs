using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement
{
    public class GetUsersUseCase
    {
        private readonly IUserRepository _repository;

        public GetUsersUseCase(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<UserDTO>, int totalPages)> Execute(string? query, sbyte? status, int? pageZise, int? page)
        {
            var result = await _repository.GetUsersAsync(query, status, pageZise, page);
            return result;
        }
    }
}
