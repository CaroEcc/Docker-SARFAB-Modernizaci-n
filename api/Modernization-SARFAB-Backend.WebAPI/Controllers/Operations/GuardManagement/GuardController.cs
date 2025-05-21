using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations.GuardManagement
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GuardController : ControllerBase
    {
        private readonly GuardAplicationService _service;
        private readonly UserContextService _userContextService;

        public GuardController(GuardAplicationService service, UserContextService userContextService)
        {
            _service = service;
            _userContextService = userContextService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] string? query,
            [FromQuery] byte? status,
            [FromQuery] int? shift,
            [FromQuery] DateOnly? startDate,
            [FromQuery] DateOnly? endDate,
            [FromQuery] int? pageSize,
            [FromQuery] int? page)
        {
            var (data, totalPages) = await _service.GetGuardsAsync(query, status, shift, startDate, endDate, page, pageSize);
            return Ok(new { Data = data, TotalPages = totalPages });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GuardDTO>> GetById(int id)
        {
            var result = await _service.GetGuardByIdAync(id);
            return Ok(result);
        }

        [HttpGet("report/{id}")]
        public async Task<IActionResult> GetReport(
            int id,
            [FromQuery] string? query,
            [FromQuery] byte? status,
            [FromQuery] int? shift,
            [FromQuery] DateOnly? startDate,
            [FromQuery] DateOnly? endDate,
            [FromQuery] int? pageSize,
            [FromQuery] int? page)
        {
            var (data, totalPages) = await _service.GetGuardsByVoluntareeIdAsync(id, query, status, shift, startDate, endDate, page, pageSize);
            return Ok(new { Data = data, TotalPages = totalPages });
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateGuardDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            await _service.CreateGuardAsync(dto, userClaims.Value.userId, userClaims.Value.userName);
            return Ok("Guardia creada correctamente");
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UpdateGuardDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            await _service.UpdateGuardAsync(dto, userClaims.Value.userId, userClaims.Value.userName);
            return Ok("Guardia actualizada correctamente");
        }

        [HttpPut("end-guard")]
        public async Task<ActionResult> EndGuard([FromBody] EndGuardDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            await _service.EndGuardAsync(dto, userClaims.Value.userId, userClaims.Value.userName);
            return Ok("Guardia finalizada correctamente");
        }

    }
}
