using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.User;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Authentication.UserManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserApplicationService _service;
        private readonly UserContextService _contextService;

        public UserController(UserApplicationService service, UserContextService contextService)
        {
            _service = service;
            _contextService = contextService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] string? query,
            [FromQuery] sbyte? status,
            [FromQuery] int? pageSize,
            [FromQuery] int? page
        )
        {
            var (data, totalPages) = await _service.GetUsersAsync(query, status, pageSize, page);
            return Ok( new { Data = data, TotalPages = totalPages});
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) 
        {
            var result = await _service.GetUserByIdAsync(id);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDTO dto)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.CreateUserAsync(dto, userClaims.Value.userName);
            return Ok("Usuario creado correctamente");
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Update(UpdateUserDTO dto)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.UpdateUserAsync(dto, userClaims.Value.userName);
            return Ok("Usuario actualizado correctamente");
        }

        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(UpdatePasswordDTO dto)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.ChangePasswordAsync(dto, userClaims.Value.userName);
            return Ok("Se cambio la contraseña correctamente");
        }

        [Authorize]
        [HttpPut("recovery-password/{id}")]
        public async Task<IActionResult> RecoveryPasswordByAdmin(short id)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.PasswordRecoveryByAdminAsync(id, userClaims.Value.userName);
            return Ok("Se ha enviado un correo con la contraseña nueva.");
        }

        [HttpPut("recovery-password")]
        public async Task<IActionResult> RecoveryPasswordByUser(PasswordRecoveryDTO dto)
        {
            await _service.PasswordRecoveryByUserAsync(dto);
            return Ok("Se ha enviado un correo con su contraseña nueva.");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(short id)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.DeleteUserAsync(id, userClaims.Value.userName);
            return Ok("Usuario eliminado correctamente");
        }

        [Authorize]
        [HttpPost("{id}")]
        public async Task<IActionResult> Enable(short id)
        {
            var userClaims = _contextService.GetUserClaims();
            await _service.EnableUserAsync(id, userClaims.Value.userName);
            return Ok("Usuario habilitado correctamente");
        }

        [Authorize]
        [HttpPut("change-password/user")]
        public async Task<IActionResult> UserChangePassword(ChangePasswordDTO dto)
        {
            await _service.UserChangePasswordAsync(dto);
            return Ok("Se cambio la contraseña correctamente");
        }
    }
}
