using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.MilitaryManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MilitaryController : ControllerBase
    {
        private readonly MilitaryApplicationService _militaryService;
        private readonly UserContextService _userContextService;

        public MilitaryController(MilitaryApplicationService militaryService, UserContextService userContextService)
        {
            _militaryService = militaryService;
            _userContextService = userContextService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMilitaryDTO request)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            await _militaryService.CreateAsync(request, userClaims.Value.userId, userClaims.Value.userName);
            return StatusCode(201, new { Message = "Militar registrado con éxito." });
        }

        [HttpGet("active-militaries")]
        public async Task<ActionResult<IEnumerable<MilitaryDTO>>> GetActiveMilitaries(
            [FromQuery] string searchTerm = null,
            [FromQuery] MilitaryEntity.MilitaryStatus? status = MilitaryEntity.MilitaryStatus.Active,
            [FromQuery] int? rankId = null,
            [FromQuery] bool orderByLastNameAsc = true,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (data, totalPages) = await _militaryService.GetAllAsync(searchTerm, status, rankId, orderByLastNameAsc, page, pageSize);
            return Ok(new
            { 
                Data = data,
                TotalPages = totalPages
            });
        }
        
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateMilitaryDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            await _militaryService.UpdateAsync(id, dto, userClaims.Value.userName);
            return Ok(new { Message = "Información del militar actualizada con éxito." });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MilitaryDTO>> GetById(int id)
        {
            var result = await _militaryService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound(new { Message = "No se encontró el militar solicitado." });
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateMilitaryStatusDTO request)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            await _militaryService.UpdateStatusAsync(id, request.Status, userClaims.Value.userName);
            string statusMessage = request.Status switch
            {
                0 => "Militar dado de baja con éxito.",
                (MilitaryEntity.MilitaryStatus)1 => "Militar reincorporado con éxito.",
                _ => "Estado del militar actualizado con éxito."
            };
            return Ok(new { Message = statusMessage });
        }
        
        [HttpGet("ranks")]
        public async Task<ActionResult<IEnumerable<RankGradeDTO>>> GetAllRanks()
        {
            var result = await _militaryService.GetAllRanksAsync();
            return result.Any() ? Ok(result) : NotFound(new { Message = "No se encontraron registros de rangos militares."});
        }
    }
}
