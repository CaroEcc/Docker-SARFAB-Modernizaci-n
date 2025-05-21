namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class ItemWithPendingTableDTO
{
    public int ItemId { get; set; }
    public string Name { get; set; }
    public int TotalQuantity { get; set; }
    public List<VolunteerPendingReturnDTO> PendingReturns { get; set; }
}
