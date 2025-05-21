using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Services.Operations;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SarOperationController : ControllerBase
    {
        private readonly SarOperationApplicationService _operationService;
        private readonly UserContextService _userContextService;

        public SarOperationController(
            SarOperationApplicationService operationService,
            UserContextService userContextService)
        {
            _operationService = operationService;
            _userContextService = userContextService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSarOperationDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            await _operationService.CreateAsync(request, userClaims.Value.userId, userClaims.Value.userName);
            return StatusCode(201, new { Message = "Operación creada con éxito." });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSarOperationDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            await _operationService.UpdateAsync(id, dto, userClaims.Value.userId, userClaims.Value.userName);
            return Ok(new { Message = "Operación actualizada con éxito." });
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveOperations(
            [FromQuery] string searchTerm = null,
            [FromQuery] int? status = (int)SarOperationEntity.OperationStatus.Active,
            [FromQuery] int? municipalityId = null,
            [FromQuery] int? categoryId = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (data, totalPages) = await _operationService.GetActiveOperationsAsync(
                searchTerm, status, municipalityId, categoryId, startDate, endDate, page, pageSize
            );
            if (data == null)
                return NotFound(new { Message = "No se encontraron operaciones activas." });
            return Ok(new
            {
                Data = data,
                TotalPages = totalPages
            });
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOperationStatusDTO request)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            await _operationService.UpdateOperationStatusAsync(id, request.Status, userClaims.Value.userName, request.Observations);

            string statusMessage = request.Status switch
            {
                0 => "Operación finalizada con éxito.",
                (SarOperationEntity.OperationStatus)1 => "Operación activada con éxito.",
                _ => "Estado de la operación actualizado con éxito."
            };

            return Ok(new { Message = statusMessage });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOperationDetail(int id)
        {
            var result = await _operationService.GetOperationDetailAsync(id);
            return result != null
                ? Ok(result)
                : NotFound(new { Message = "No se encontró la operación SAR solicitada." });
        }

        [HttpGet("get-data-mark-absence/{id}")]
        public async Task<IActionResult> GetDataMarkAbsence(int id)
        {
            var result = await _operationService.GetDataMarkAbsenceAsync(id);
            return result != null
                ? Ok(result)
                : NotFound(new { Message = "No se encontraron datos para marcar inasistencia en la operación." });
        }
        
        [HttpPatch("update-status-person-operation")]
        public async Task<IActionResult> UpdateStatusPersonOperation([FromBody] PersonOperationEntity personOperationEntity)
        {
            await _operationService.UpdateStatusPersonOperationAsync(personOperationEntity);
            return Ok(new { Message = "Estado de la persona en la operación actualizado con éxito." });
        }
    }
}
