namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class InventoryItemDTO
{
    public int ItemId { get; set; }
    public string Name { get; set; }
    public int TotalStock { get; set; }
    public int AssignedQuantity { get; set; }
    public int AvailableQuantity { get; set; }
}