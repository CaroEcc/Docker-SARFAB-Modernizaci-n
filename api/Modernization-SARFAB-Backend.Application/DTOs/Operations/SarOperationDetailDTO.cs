namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class SarOperationDetailDTO
{
    public int OperationId { get; set; }
    public string OperationTypeName { get; set; }
    public string CategoryName { get; set; }
    public string DepartmentName { get; set; }
    public string MunicipalityName { get; set; }
    public string ProvinceName { get; set; }
    public string Address { get; set; }
    public DateTime DepartureDate { get; set; }
    public DateTime? ArrivalDate { get; set; }
    public string? Observations { get; set; }
    public string OperationStatus { get; set; }
    public string RequesterName { get; set; }
    public string RequesterPhone { get; set; }
    public string RequesterMobile { get; set; }

    public OperationPersonnelDTO Responsible { get; set; }

    public List<OperationPersonnelDTO> Personnel { get; set; }
    public int RequesterId { get; set; }
    public int OperationTypeId { get; set; }
    public int MunicipalityId { get; set; }
}