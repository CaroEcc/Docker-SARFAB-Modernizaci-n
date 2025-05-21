using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using System.Security.Claims;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VolunteerGradePromotionController : ControllerBase
    {
        private readonly VolunteerGradePromotionApplicationService _volunteerGradePromotionService;

        public VolunteerGradePromotionController(VolunteerGradePromotionApplicationService volunteerGradePromotionService)
        {
            _volunteerGradePromotionService = volunteerGradePromotionService;
        }

        [HttpPatch("{volunteerId}/promote")]
        public async Task<IActionResult> Promote(int volunteerId)
        {
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(userName))
                return BadRequest(new { message = "Usuario no identificado." });

            await _volunteerGradePromotionService.PromoteAsync(volunteerId, userName);
            return Ok(new { message = "Voluntario ascendido exitosamente." });
        }
    }
}
