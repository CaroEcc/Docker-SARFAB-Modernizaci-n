using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecruitmentController : ControllerBase
    {
        private readonly RecruitmentApplicationService _recruitmentService;
        private readonly UserContextService _userContextService;

        public RecruitmentController(RecruitmentApplicationService recruitmentService, UserContextService userContextService)
        {
            _recruitmentService = recruitmentService;
            _userContextService = userContextService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string searchTerm = null,
            [FromQuery] RecruitmentEntity.RecruitmentStatus? status = RecruitmentEntity.RecruitmentStatus.InProcess,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (data, totalPages) = await _recruitmentService.GetAllAsync(searchTerm, status, page, pageSize);
            if (!data.Any())
                return Ok(new { Message = "No existen registros de reclutamiento.", Data = data, TotalPages = totalPages });
            return Ok(new { Data = data, TotalPages = totalPages });
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRecruitmentDTO request)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            var recruitmentId = await _recruitmentService.CreateAsync(request, userClaims.Value.userId, userClaims.Value.userName);
            return StatusCode(201, new { Id = recruitmentId, Message = "Reclutamiento creado con éxito." });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRecruitmentDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            request.RecruitmentId = id;
            await _recruitmentService.UpdateAsync(request, userClaims.Value.userName);

            return Ok(new { Message = "Reclutamiento actualizado con éxito." });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecruitmentDTO>> GetById(int id)
        {
            var result = await _recruitmentService.GetByIdAsync(id);
            if (result == null)
                return NotFound(new { Message = "Recluta no encontrado." });
            return Ok(result);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateRecruimentStatusDTO request)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest("User claims not found");

            await _recruitmentService.UpdateStatusAsync(id, request.Status, userClaims.Value.userName);
            string statusMessage = request.Status switch
            {
                0 => "Reclutamiento rechazado con éxito.",
                (RecruitmentEntity.RecruitmentStatus)2 => "Reclutamiento aprobado con éxito.",
                _ => "Estado de reclutamiento actualizado con éxito."
            };
            return Ok(new { Message = statusMessage });
        }
    }
}
