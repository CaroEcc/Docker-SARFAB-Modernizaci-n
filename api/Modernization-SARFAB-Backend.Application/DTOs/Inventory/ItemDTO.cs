namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class ItemDTO
{
    public int ItemId { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public int AvailableQuantity { get; set; }
    public int AssignedQuantity { get; set; }
}