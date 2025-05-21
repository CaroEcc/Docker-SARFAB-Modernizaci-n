namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class RequesterDTO
{
    public int RequesterId { get; set; }
    public string Name { get; set; } = null!;
    public string? Phone { get; set; }
    public string? MobilePhone { get; set; }
}