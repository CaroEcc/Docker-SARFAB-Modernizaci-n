namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class VolunteerMedicalCheckDTO
    {
        public int CheckupId { get; set; }
        public DateOnly CheckupDate { get; set; }
        public DateOnly ExpirationDate { get; set; }
        public string? Observations { get; set; }
    }
}
