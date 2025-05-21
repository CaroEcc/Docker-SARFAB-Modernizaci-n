using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class CreateDemeritPointDTO
{
    [Required(ErrorMessage = "Debe seleccionar un voluntario.")]
    public int VolunteerId { get; set; }

    [Required(ErrorMessage = "Debe ingresar una razón.")]
    [StringLength(300, ErrorMessage = "La razón no puede tener más de 300 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "La razón no puede estar vacía o contener solo espacios.")]
    public string Reason { get; set; }

    [Required(ErrorMessage = "Debe ingresar una fecha válida.")]
    public DateOnly Date { get; set; }

    [StringLength(500, ErrorMessage = "La observación no puede tener más de 500 caracteres.")]
    public string? Observation { get; set; } = "Ninguna";
}