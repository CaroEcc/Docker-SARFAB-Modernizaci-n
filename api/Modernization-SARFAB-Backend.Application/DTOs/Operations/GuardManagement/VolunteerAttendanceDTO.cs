namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement
{
    public class VolunteerAttendanceDTO
    {
        public int VoluntareeId { get; set; }
        public byte Status { get; set; }
        public string Observation { get; set; } = string.Empty;
    }
}
