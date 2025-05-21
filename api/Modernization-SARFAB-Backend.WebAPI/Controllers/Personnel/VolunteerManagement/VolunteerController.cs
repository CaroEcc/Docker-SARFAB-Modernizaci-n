using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using System.Security.Claims;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VolunteerController : ControllerBase
    {
        private readonly VolunteerAplicationService _volunteerService;
        private readonly UserContextService _userContextService;

        public VolunteerController(VolunteerAplicationService volunteerService, UserContextService userContextService)
        {
            _volunteerService = volunteerService;
            _userContextService = userContextService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVolunteerDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userNameClaim = User.FindFirst(ClaimTypes.Name);

            if (userIdClaim == null || userNameClaim == null)
                return BadRequest(new { message = "User claims not found" });

            var userId = short.Parse(userIdClaim.Value);
            var userName = userNameClaim.Value;

            await _volunteerService.CreateAsync(request, userId, userName);
            return StatusCode(201, new { message = "Voluntario registrado exitosamente." });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateVolunteerDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { message = "User claims not found" });

            await _volunteerService.UpdateVolunteerAsync(id, dto, userClaims.Value.userName);
            return Ok(new { message = "Voluntario actualizado correctamente." });
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateVolunteerStatusDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { message = "User claims not found" });

            await _volunteerService.UpdateVolunteerStatusAsync(id, dto, userClaims.Value.userName);
            return Ok(new { message = "Estado del voluntario actualizado correctamente." });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VolunteerDetailsDTO>> GetById(int id)
        {
            var result = await _volunteerService.GetVolunteerDetailsAsync(id);
            return result != null 
                ? Ok(result) 
                : NotFound(new { message = "No se encontró el voluntario." });
        }

        [HttpGet("active-volunteers")]
        public async Task<ActionResult<IEnumerable<VolunteerListDTO>>> GetActiveVolunteers(
            [FromQuery] string searchTerm = null,
            [FromQuery] int? gradeId = null,
            [FromQuery] bool orderByLastNameAsc = true,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _volunteerService.GetActiveVolunteersAsync(searchTerm, gradeId, orderByLastNameAsc, page, pageSize);
            return result.Data.Any() 
                ? Ok(new {Data = result.Data, TotalPages = result.TotalPages }) 
                : NotFound(new { message = "No se encontraron voluntarios." });
        }

        [HttpGet("historical-list")]
        public async Task<ActionResult<IEnumerable<HistoricalListVolunteersDTO>>> GetHistoricalListVolunteers(
            [FromQuery] string searchTerm = null,
            [FromQuery] int? gradeId = null,
            [FromQuery] VolunteerEntity.VolunteerStatus? status = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await _volunteerService.GetHistoricalListVolunteersAsync(searchTerm, gradeId, status, startDate, endDate, page, pageSize);
            return result.Data.Any() 
                ? Ok(new { Data = result.Data, TotalPages = result.TotalPages }) 
                : NotFound(new { message = "No se encontraron voluntarios en el histórico." });
        }

        [HttpGet("grades")]
        public async Task<ActionResult<IEnumerable<RankGradeDTO>>> GetAllGrades()
        {
            var result = await _volunteerService.GetAllGradesAsync();
            return result.Any() 
                ? Ok(result) 
                : NotFound(new { message = "No se encontraron grados." });
        }

    }
}
