using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Authentication;
using Modernization_SARFAB_Backend.Application.UseCases.Authentication;
using Modernization_SARFAB_Backend.Application.Services.Common;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Authentication
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LoginUseCase _loginUseCase;
        private readonly GetAuthenticatedUserUseCase _getAuthenticatedUserUseCase;
        private readonly UserContextService _userContextService;

        public AuthController(
            LoginUseCase loginUseCase, 
            GetAuthenticatedUserUseCase getAuthenticatedUserUseCase,
            UserContextService userContextService)
        {
            _loginUseCase = loginUseCase;
            _getAuthenticatedUserUseCase = getAuthenticatedUserUseCase;
            _userContextService = userContextService;
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginTokenDTO>> Login([FromBody] LoginRequest request)
        {
            var response = await _loginUseCase.ExecuteAsync(request);
            return Ok(new { Message = "Inicio de sesión exitoso.", Token = response.Token });
        }


        [HttpGet("user")]
        public async Task<ActionResult<AuthUserDTO>> GetUser()
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return Unauthorized(new { Message = "Usuario no autenticado." });

            var user = await _getAuthenticatedUserUseCase.ExecuteAsync(userClaims.Value.userId);
            return Ok(new { Message = "Usuario autenticado.", User = user });
        }
    }
}