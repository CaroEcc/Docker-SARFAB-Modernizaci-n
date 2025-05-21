using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Operations;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations;

[Authorize]
[ApiController]
[Route("api/operation-types")]
public class OperationTypeController : ControllerBase
{
    private readonly OperationTypeApplicationService _operationTypeService;
    private readonly UserContextService _userContextService;

    public OperationTypeController(
        OperationTypeApplicationService operationTypeService,
        UserContextService userContextService)
    {
        _operationTypeService = operationTypeService;
        _userContextService = userContextService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOperationTypeDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("No se encontraron los datos del usuario.");

        var (userId, userName) = userClaims.Value;

        await _operationTypeService.CreateOperationTypeAsync(request, userId, userName);
        return StatusCode(201, new { Mensaje = "Tipo de operación creado exitosamente." });
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateOperationTypeDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("No se encontraron los datos del usuario.");

        var (userId, userName) = userClaims.Value;

        await _operationTypeService.UpdateOperationTypeAsync(id, request, userId, userName);
        return Ok(new { Mensaje = "Tipo de operación actualizado exitosamente." });
    }
}