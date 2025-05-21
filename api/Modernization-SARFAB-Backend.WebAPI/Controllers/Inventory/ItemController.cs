using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Inventory;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Inventory;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Inventory;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly ItemApplicationService _itemApplicationService;
    private readonly UserContextService _userContextService;
    
    public ItemController(
        ItemApplicationService itemApplicationService,
        UserContextService userContextService)
    {
        _itemApplicationService = itemApplicationService;
        _userContextService = userContextService;
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateItemDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.CreateItemAsync(request, userId, userName);
        return StatusCode(201, new { Message = "Elemento creado con éxito." });
    }
    
    [HttpPatch("{id}")] 
    public async Task<IActionResult> Update(int id, [FromBody] UpdateItemDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.UpdateItemAsync(id, request, userId, userName);
        return Ok(new { Message = "Elemento actualizado con éxito." });
    }
    
    [HttpGet("detail-with-pending-table/{id}")]
    public async Task<IActionResult> GetItemByIdWithPendingTable(int id)
    {
        var item = await _itemApplicationService.GetItemByIdWithPendingTableAsync(id);
        if (item == null)
            return NotFound(new { Message = "No se encontró el elemento solicitado." });
        return Ok(item);
    }
    
    [HttpGet("inventory-items")]
    public async Task<IActionResult> GetInventoryItems(
        [FromQuery] string searchTerm = null,
        [FromQuery] bool orderByNameAsc = true,
        [FromQuery] int pageIndex = 1,
        [FromQuery] int pageSize = 10)
    {
        var (items, totalPages) = await _itemApplicationService.GetInventoryItemsAsync(searchTerm, orderByNameAsc, pageIndex, pageSize);
        
        if (items == null || !items.Any())
        {
            return Ok(new { Message = "No se tienen elementos agregados aún.", Data = items, TotalPages = totalPages });
        }
        
        return Ok(new { Data = items, TotalPages = totalPages });
    }
    
    [HttpPost("extract")]
    public async Task<IActionResult> ExtractItem([FromBody] InventoryMovementDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.ExtractItemAsync(request, userId, userName);
        return Ok(new { Message = "Extracción realizada con éxito." });
    }
    
    [HttpPost("return")]
    public async Task<IActionResult> ReturnItem([FromBody] InventoryMovementDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.ReturnItemAsync(request, userId, userName);
        return Ok(new { Message = "Devolución realizada con éxito." });
    }
    
    [HttpPost("extract-batch")]
    public async Task<IActionResult> ExtractBatchItems([FromBody] InventoryBatchMovementDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.ExtractBatchItemsAsync(request, userId, userName);
        return Ok(new { Message = "Extracción de lote realizada con éxito." });
    }
    
    [HttpPost("return-batch")]
    public async Task<IActionResult> ReturnBatchItems([FromBody] InventoryBatchMovementDTO request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userClaims = _userContextService.GetUserClaims();
        if (userClaims == null)
            return BadRequest("User claims not found");

        var (userId, userName) = userClaims.Value;

        await _itemApplicationService.ReturnBatchItemsAsync(request, userId, userName);
        return Ok(new { Message = "Devolución de lote realizada con éxito." });
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _itemApplicationService.GetItemByIdAsync(id);
        if (item == null)
            return NotFound(new { Message = "No se encontró el elemento solicitado." });
        return Ok(item);
    }
    
    [HttpGet("volunteer-pending-returns/{itemId}")]
    public async Task<IActionResult> GetVolunteerPendingReturns(int itemId)
    {
        var pendingReturns = await _itemApplicationService.GetVolunteerPendingReturnsAsync(itemId);
        if (pendingReturns == null || !pendingReturns.Any())
            return NotFound(new { Message = "No se encontraron devoluciones pendientes." });
        return Ok(pendingReturns);
    }
    
    [HttpGet("all-items")]
    public async Task<IActionResult> GetAllItems()
    {
        var items = await _itemApplicationService.GetAllItemsAsync();
        // var result = items.Select(i => new { i.ItemId, i.Name });
        if (items == null || !items.Any())
            return NotFound(new { Message = "No se encontraron elementos." });
        return Ok(items);
    }
    
    [HttpGet("owed-by-volunteer/{volunteerId}")]
    public async Task<IActionResult> GetItemsOwedByVolunteer(int volunteerId)
    {
        var items = await _itemApplicationService.GetItemsOwedByVolunteerAsync(volunteerId);
        if (items == null || !items.Any())
            return NotFound(new { Message = "No se encontraron elementos." });
        return Ok(items);
    }
    
    [HttpGet("movement-history")]
    public async Task<IActionResult> GetMovementHistory(    
        [FromQuery] string searchTerm = null,
        [FromQuery] int? movementType = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] int pageIndex = 1,
        [FromQuery] int pageSize = 10)
    {
        var (history, totalPages) = await _itemApplicationService.GetMovementHistoryAsync(searchTerm, movementType, startDate, endDate, pageIndex, pageSize);
        
        if (history == null || !history.Any())
        {
            return Ok(new { Message = "No se encontraron movimientos.", Data = history, TotalPages = totalPages });
        }
        
        return Ok(new { Data = history, TotalPages = totalPages });
    }
    
    [HttpGet("all-volunteer-pending-returns")]
    public async Task<IActionResult> GetAllVolunteerPendingReturns()
    {
        var pendingReturns = await _itemApplicationService.GetAllVolunteerPendingReturnsAsync();
        if (pendingReturns == null || !pendingReturns.Any())
            return NotFound(new { Message = "No se encontraron devoluciones pendientes." });
        return Ok(pendingReturns);
    }
}
