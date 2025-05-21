using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using System.Net;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalCheckupController : ControllerBase
    {
        private readonly MedicalCheckupApplicationService _medicalCheckupApplicationService;
        private readonly UserContextService _userContextService;

        public MedicalCheckupController(MedicalCheckupApplicationService medicalCheckupApplicationService,
            UserContextService userContextService)
        {
            _medicalCheckupApplicationService = medicalCheckupApplicationService;
            _userContextService = userContextService;
        }

        [HttpGet("volunteer-medical-checkups/{volunteerId}")]
        public async Task<ActionResult<IEnumerable<VolunteerMedicalCheckDTO>>> GetAllById(int volunteerId)
        {
            var result = await _medicalCheckupApplicationService.GetMedicalCheckupsAsync(volunteerId);
            if (result == null || !result.Any())
                return NotFound(new { message = "No se encontraron chequeos médicos para el voluntario especificado." });

            return Ok(result);
        }

        [HttpGet("volunteer-medical-checkup/{id}")]
        public async Task<ActionResult<VolunteerMedicalCheckDTO>> GetById(int id)
        {
            var result = await _medicalCheckupApplicationService.GetVolunteerMedicalCheckAsync(id);
            if (result == null)
                return NotFound(new { message = "No se encontró el chequeo médico solicitado." });

            return Ok(result);
        }

        [HttpPost("create-medical-checkup")]
        public async Task<ActionResult> CreateMedicalCheckup([FromBody] CreateMedicalCheckupDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { message = "No se encontraron los datos del usuario." });

            await _medicalCheckupApplicationService.CreateMedicalCheckupAsync(dto, userClaims.Value.userId, userClaims.Value.userName);
            return StatusCode((int)HttpStatusCode.Created, new { message = "Chequeo médico registrado con éxito." });
        }

        [HttpPatch("update-medical-checkup/{id}")]
        public async Task<ActionResult> UpdateMedicalCheckup(int id, [FromBody] UpdateMedicalCheckupDTO dto)
        {
            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { message = "No se encontraron los datos del usuario." });

            var exists = await _medicalCheckupApplicationService.GetVolunteerMedicalCheckAsync(id);
            if (exists == null)
                return NotFound(new { message = "No se encontró el chequeo médico a actualizar." });

            await _medicalCheckupApplicationService.UpdateMedicalCheckupAsync(dto, id, userClaims.Value.userName);
            return Ok(new { message = "Chequeo médico actualizado con éxito." });
        }
    }
}
