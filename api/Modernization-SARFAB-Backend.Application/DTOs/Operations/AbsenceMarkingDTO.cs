namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class AbsenceMarkingDTO
{
    public string Activity { get; set; }
    public string DepartmentName { get; set; }
    public string MunicipalityName { get; set; }
    public string ProvinceName { get; set; }
    public DateTime DepartureDate { get; set; }
    public DateTime? ArrivalDate { get; set; }
    
    public List<OperationPersonnelDTO> Volunteers { get; set; }
    public byte? Status { get; set; }
}