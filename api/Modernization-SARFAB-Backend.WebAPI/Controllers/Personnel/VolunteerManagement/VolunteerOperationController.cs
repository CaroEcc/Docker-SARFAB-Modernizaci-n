using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.Services.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class VolunteerOperationController : ControllerBase
{
    private readonly VolunterOperationApplicationService _volunteerOperationApplicationService;
    
    public VolunteerOperationController(VolunterOperationApplicationService volunteerOperationApplicationService)
    {
        _volunteerOperationApplicationService = volunteerOperationApplicationService;
    }
    
    [HttpGet("volunteer/{volunteerId}/operations-report")]
    public async Task<IActionResult> GetVolunteerOperationsReport(
        int volunteerId,
        [FromQuery] string? searchTerm = null,
        [FromQuery] int? status = null,
        [FromQuery] int? categoryId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] bool orderByDateAsc = false,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var (data, totalPages) = await _volunteerOperationApplicationService.GetVolunteerOperationsReportAsync(
            volunteerId, searchTerm, status, categoryId, startDate, endDate, orderByDateAsc, page, pageSize);

        return data.Any()
            ? Ok(new { Data = data, TotalPages = totalPages })
            : NotFound(new { Message = $"No se encontraron operativos registrasdos." });
    }
}