namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;

public class GuardDTO
{
    public int GuardId { get; set; }
    public DateOnly GuardDate { get; set; }
    public int ShiftId { get; set; }
    public string ShiftName { get; set; }
    public int ResponsibleId { get; set; }
    public string ResponsibleFullname { get; set; }
    public string Location { get; set; }
    public int VolunteerQuantity { get; set; }
    public string? Observation { get; set; }
    public sbyte? Status { get; set; }

    public List<VoluntareeGuardDTO>? VoluntareeGuards { get; set; } = new List<VoluntareeGuardDTO>();
}