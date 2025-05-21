using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.Services.Personnel;
using System.Security.Claims;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MilitaryRankAssignmentController : ControllerBase
    {
        private readonly MilitaryRankAssignmentApplicationService _militaryRankAssignmentService;

        public MilitaryRankAssignmentController(MilitaryRankAssignmentApplicationService militaryRankAssignmentService)
        {
            _militaryRankAssignmentService = militaryRankAssignmentService;
        }

        [HttpPatch("{militaryId}/promote")]
        public async Task<IActionResult> Promote(int militaryId)
        {
            var userClaims = User.Claims;
            if (userClaims == null)
                return BadRequest("User claims not found");

            var userName = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            if (userName == null)
                return BadRequest("User name not found");

            try
            {
                await _militaryRankAssignmentService.PromoteAsync(militaryId, userName);
                return Ok(new { Message = "Militar ascendido con éxito." });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
