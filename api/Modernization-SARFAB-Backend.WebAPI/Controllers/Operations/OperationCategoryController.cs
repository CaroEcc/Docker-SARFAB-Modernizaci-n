using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Operations;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations;

[Authorize]
[ApiController]
[Route("api/operation-categories")]
public class OperationCategoryController : ControllerBase
{
    private readonly OperationCategoryApplicationService _operationCategoryService;
    private readonly UserContextService _userContextService;

    public OperationCategoryController(
        OperationCategoryApplicationService operationCategoryService,
        UserContextService userContextService)
    {
        _operationCategoryService = operationCategoryService;
        _userContextService = userContextService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOperationCategoryDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("No se encontraron los datos del usuario.");

        var (userId, userName) = userClaims.Value;

        await _operationCategoryService.CreateOperationCategoryAsync(request, userId, userName);
        return StatusCode(201, new { Mensaje = "Categoría de operación creada exitosamente." });
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateOperationCategoryDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("No se encontraron los datos del usuario.");

        var (userId, userName) = userClaims.Value;

        await _operationCategoryService.UpdateOperationCategoryAsync(id, request, userId, userName);
        return Ok(new { Mensaje = "Categoría de operación actualizada exitosamente." });
    }
    
    [HttpGet ("categories-with-types")]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? searchTerm = null, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        var result = await _operationCategoryService.GetCategoriesWithTypesAsync(searchTerm, page, pageSize);
        return Ok(result);
    }
}