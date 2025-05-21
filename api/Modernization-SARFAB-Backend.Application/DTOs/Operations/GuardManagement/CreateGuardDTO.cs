using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;

public class CreateGuardDTO
{
    [Required(ErrorMessage = "La fecha es requerida")]
    public DateOnly GuardDate { get; set; }
    [Required(ErrorMessage = "La ubicación es requerido")]
    [MaxLength(255, ErrorMessage = "La ubicación no debe tener más de 255 caracteres")]
    public string Location { get; set; }
    [Required(ErrorMessage = "El responsable es requerido")]
    public int ResponsibleId { get; set; }
    [Required(ErrorMessage = "El turno es requerido")]
    public int shiftId { get; set; }
    [Required(ErrorMessage = "La lista de voluntarios es requerida")]
    public List<int> VoluntareeIds { get; set; } = new List<int>();
}