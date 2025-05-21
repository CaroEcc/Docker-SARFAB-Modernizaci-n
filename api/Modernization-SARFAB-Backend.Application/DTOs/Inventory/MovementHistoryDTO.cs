namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class MovementHistoryDTO
{
    public string VolunteerName { get; set; } 
    public string ItemName { get; set; }
    public DateTime MovementDate { get; set; }
    public string Action { get; set; } 
    public int Quantity { get; set; }
}