using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.UseCases.Operations;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations;

[Authorize]
[ApiController]
[Route("api/requesters")]
public class RequesterController : ControllerBase
{
    private readonly GetRequestersUseCase _getRequestersUseCase;

    public RequesterController(GetRequestersUseCase getRequestersUseCase)
    {
        _getRequestersUseCase = getRequestersUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> GetRequesters([FromQuery] string? searchTerm, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _getRequestersUseCase.ExecuteAsync(searchTerm, page, pageSize);

            if (!result.Data.Any())
            {
                return Ok(new { Mensaje = "No se encontraron solicitantes.", Data = result.Data, TotalPages = result.TotalPages });
            }

            return Ok(new { Data = result.Data, TotalPages = result.TotalPages });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Success = false,
                Message = "Error interno del servidor",
                Error = ex.Message,
                StackTrace = ex.StackTrace
            });
        }
    }
}
