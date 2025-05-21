using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Authentication.UserManagement;

namespace Modernization_SARFAB_Backend.Application.Services.User
{
    public class UserApplicationService
    {
        private readonly GetUserByIdUseCase _getUserByIdUseCase;
        private readonly GetUsersUseCase _getUsersUseCase;
        private readonly CreateUserUseCase _createUserUseCase;
        private readonly UpdateUserUseCase _updateUserUseCase;
        private readonly ChangePasswordUseCase _changePasswordUseCase;
        private readonly PasswordRecoveryByAdminUseCase _passwordRecoveryByAdminUseCase;
        private readonly PasswordRecoveryByUserUseCase _passwordRecoveryByUserUseCase;
        private readonly UpdateUserStatusUseCase _deleteUserUseCase;
        private readonly UserChangePasswordUseCase _userChangePasswordUseCase;

        public UserApplicationService(GetUserByIdUseCase getUserByIdUseCase, GetUsersUseCase getUsersUseCase, CreateUserUseCase createUserUseCase, UpdateUserUseCase updateUserUseCase, ChangePasswordUseCase changePasswordUseCase, PasswordRecoveryByAdminUseCase passwordRecoveryByAdminUseCase, PasswordRecoveryByUserUseCase passwordRecoveryByUserUseCase, UpdateUserStatusUseCase deleteUserUseCase, UserChangePasswordUseCase userChangePasswordUseCase)
        {
            _getUserByIdUseCase = getUserByIdUseCase;
            _getUsersUseCase = getUsersUseCase;
            _createUserUseCase = createUserUseCase;
            _updateUserUseCase = updateUserUseCase;
            _changePasswordUseCase = changePasswordUseCase;
            _passwordRecoveryByAdminUseCase = passwordRecoveryByAdminUseCase;
            _passwordRecoveryByUserUseCase = passwordRecoveryByUserUseCase;
            _deleteUserUseCase = deleteUserUseCase;
            _userChangePasswordUseCase = userChangePasswordUseCase;
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
            => await _getUserByIdUseCase.Execute(id);

        public async Task<(IEnumerable<UserDTO>, int totalPages)> GetUsersAsync(string? query, sbyte? status, int? pageZise, int? page)
            => await _getUsersUseCase.Execute(query, status, pageZise, page);

        public async Task CreateUserAsync(CreateUserDTO dto, string userName)
            => await _createUserUseCase.Execute(dto, userName);

        public async Task UpdateUserAsync(UpdateUserDTO dto, string userName)
            => await _updateUserUseCase.Execute(dto, userName);

        public async Task ChangePasswordAsync(UpdatePasswordDTO dto, string userName)
            => await _changePasswordUseCase.Execute(dto, userName);

        public async Task PasswordRecoveryByAdminAsync(short userId, string userName)
            => await _passwordRecoveryByAdminUseCase.Execute(userId, userName);

        public async Task PasswordRecoveryByUserAsync(PasswordRecoveryDTO dto)
            => await _passwordRecoveryByUserUseCase.Execute(dto);

        public async Task DeleteUserAsync(short userId, string userName)
            => await _deleteUserUseCase.Execute(userId, 0, userName);

        public async Task EnableUserAsync(short userId, string userName)
            => await _deleteUserUseCase.Execute(userId, 1, userName);

        public async Task UserChangePasswordAsync(ChangePasswordDTO dto)
            => await _userChangePasswordUseCase.Execute(dto);
    }
}
