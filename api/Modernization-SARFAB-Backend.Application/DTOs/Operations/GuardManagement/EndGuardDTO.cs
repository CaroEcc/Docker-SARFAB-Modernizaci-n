using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement
{
    public class EndGuardDTO
    {
        [Required]
        public int GuardId { get; set; }
        [MaxLength(500, ErrorMessage = "La observación no debe tener más de 500 caracteres")]
        public string Observations { get; set; } = string.Empty;
        [Required(ErrorMessage = "La lista de asistencia es requerida")]
        public List<VolunteerAttendanceDTO> VolunteerAttendances { get; set; } = new();
    }
}
