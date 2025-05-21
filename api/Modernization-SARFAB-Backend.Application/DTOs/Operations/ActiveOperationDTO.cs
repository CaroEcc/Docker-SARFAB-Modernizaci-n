namespace Modernization_SARFAB_Backend.Application.DTOs.Operations
{
    public class ActiveOperationDTO
    {
        public int OperationId { get; set; }
        public string MunicipalityName { get; set; }
        public string Address { get; set; }
        public string RequesterName { get; set; }
        public string CategoryAndOperationType { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public string? Responsible { get; set; }
        public int Status { get; set; }
    }
}