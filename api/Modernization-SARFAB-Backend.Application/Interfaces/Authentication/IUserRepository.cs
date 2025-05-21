using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Authentication;


namespace Modernization_SARFAB_Backend.Application.Interfaces.Authentication
{
    public interface IUserRepository
    {
        Task<UserEntity> GetByUsernameAsync(string username);
        Task<UserEntity> GetByIdAsync(short userId);
        Task<(IEnumerable<UserDTO>, int totalPages)> GetUsersAsync(string? query, sbyte? status, int? pageZise, int? page);
        Task<UserDTO> GetUserByUserIdAsync(int id);
        Task<int> CreateUserAsync(UserEntity userEntity);
        Task UpdateUserAsync(UserEntity userEntity);
    }
}
