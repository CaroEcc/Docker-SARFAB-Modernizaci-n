using Modernization_SARFAB_Backend.Application.DTOs.Authentication;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication
{
    public class GetAuthenticatedUserUseCase
    {
        private readonly IUserRepository _userRepository;

        public GetAuthenticatedUserUseCase(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AuthUserDTO> ExecuteAsync(short userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new BusinessException("Usuario no encontrado");

            return new AuthUserDTO(user.Id, user.Username, user.Email, user.Person.FirstName, user.Person.LastName, (byte)user.Role, (byte)user.FirstLogin);
        }
    }
}