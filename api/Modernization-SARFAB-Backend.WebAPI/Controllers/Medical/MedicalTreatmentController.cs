using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Medical;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Medical;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Medical
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalTreatmentController : ControllerBase
    {
        private readonly MedicalTreatmentApplicationService _medicalService;
        private readonly UserContextService _userContextService;

        public MedicalTreatmentController(MedicalTreatmentApplicationService medicalService, UserContextService userContextService)
        {
            _medicalService = medicalService;
            _userContextService = userContextService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] string? query,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] int? pageSize,
        [FromQuery] int? page)
        {
            var (data, totalPages) = await _medicalService.GetMedicalTreatmentsAsync(query, startDate, endDate, pageSize, page);
            return Ok(new { Data = data, TotalPages = totalPages });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _medicalService.GetMedicalTreatmentByIdAsync(id);
            return result != null ? Ok(result) : NotFound("No se encontraró el tratamiento.");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMedicalTreatmentDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var userClaims = _userContextService.GetUserClaims();

            if (userClaims == null)
                return BadRequest("User claims not found");

            await _medicalService.CreateMedicalTreatmentAsync(dto, userClaims.Value.userId, userClaims.Value.userName);

            return Ok("Tratamiento registrado correctamente");
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateMedicalTreatmentDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();

            if (userClaims == null)
                return BadRequest("User claims not found");
            
            await _medicalService.UpdateMedicalTreatmentAsync(dto, userClaims.Value.userId, userClaims.Value.userName);

            return Ok("Tratamiento actualizado correctamente");
        }
    }
}
