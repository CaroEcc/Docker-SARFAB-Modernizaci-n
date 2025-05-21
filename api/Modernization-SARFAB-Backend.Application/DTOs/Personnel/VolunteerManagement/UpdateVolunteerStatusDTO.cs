using System.ComponentModel.DataAnnotations;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.VolunteerEntity;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class UpdateVolunteerStatusDTO
    {
        [Required]
        public VolunteerStatus Status { get; set; }
        public string? DischargeReason { get; set; } = "No se especificó una razón de baja o egreso.";
    }
}
