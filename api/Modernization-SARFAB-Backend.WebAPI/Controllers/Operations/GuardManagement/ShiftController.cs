using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Services.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations.GuardManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ShiftController : ControllerBase
    {
        private readonly ShiftAplicationService _shiftService;

        public ShiftController(ShiftAplicationService shiftService)
        {
            _shiftService = shiftService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShiftDTO>>> Get()
        {
            var result = await _shiftService.GetShiftsAsync();
            return result != null ? Ok(result) : NotFound("No se encontraron turnos");
        }
    }
}
