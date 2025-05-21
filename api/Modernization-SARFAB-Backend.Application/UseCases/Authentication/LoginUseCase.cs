using Modernization_SARFAB_Backend.Application.DTOs.Authentication;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Authentication;

namespace Modernization_SARFAB_Backend.Application.UseCases.Authentication
{
    public class LoginUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;


        public LoginUseCase(
            IUserRepository userRepository,
            ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<LoginTokenDTO> ExecuteAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByUsernameAsync(request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                throw new BusinessException("Credenciales inválidas");

            if(user.Status == 0)
                throw new BusinessException("Este usuario no esta habilitado");


            var token = _tokenService.GenerateToken(user);

            return new LoginTokenDTO(token);
        }
    }
}
