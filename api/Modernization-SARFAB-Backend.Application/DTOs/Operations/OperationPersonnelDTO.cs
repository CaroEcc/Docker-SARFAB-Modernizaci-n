namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class OperationPersonnelDTO
{
    public int? PersonId { get; set; }
    public string FullName { get; set; }
    public string RankOrGrade { get; set; }
    public byte? Status { get; set; }
}