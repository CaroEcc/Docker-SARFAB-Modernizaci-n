using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DemeritPointController : ControllerBase
    {
        private readonly DemeritPointApplicationService _demeritPointApplicationService;
        private readonly UserContextService _userContextService;

        public DemeritPointController(DemeritPointApplicationService demeritPointApplicationService, UserContextService userContextService)
        {
            _demeritPointApplicationService = demeritPointApplicationService;
            _userContextService = userContextService;
        }

        [HttpGet("volunteer-total-points/{id}")]
        public async Task<ActionResult<TotalPointsLostDTO>> GetTotalPointsLost(int id)
        {
            try
            {
                var result = await _demeritPointApplicationService.GetTotalPointsLostAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound("No se encontró el total de puntos perdidos.");
            }
        }
        
        [HttpGet("volunteer-lost-points/{id}")]
        public async Task<ActionResult<IEnumerable<ListLostPointsDTO>>> GetListLostPoints(int id)
        {
            try
            {
                var result = await _demeritPointApplicationService.GetListLostPointsAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound("No se encontro la lista de puntos de este voluntario");
            }
        }

        [HttpPost("create-demerit-point")]
        public async Task<ActionResult> CreateDemeritPoint([FromBody] CreateDemeritPointDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");
            await _demeritPointApplicationService.CreateDemeritPointAsync(dto, userClaims.Value.userId);
            return StatusCode(201);
        }

        [HttpDelete("delete-demerit-point/{id}")]
        public async Task<ActionResult> DeleteDemeritPoint(int id)
        {
            try
            {
                await _demeritPointApplicationService.DeleteDemeritPointAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound("No se encontró el registro.");
            }
        }
    }
}
