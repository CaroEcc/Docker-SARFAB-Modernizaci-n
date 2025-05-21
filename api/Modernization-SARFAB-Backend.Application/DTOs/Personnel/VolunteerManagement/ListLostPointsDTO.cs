namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;

public class ListLostPointsDTO
{
    public int DemeritId { get; set; }
    public string Reason { get; set; }
    public DateOnly Date { get; set; }
    public int PointsLost { get; set; }
    public string? Observation { get; set; }
}