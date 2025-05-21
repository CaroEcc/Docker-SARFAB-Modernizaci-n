using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class CreateRequesterDTO
{
    [Required(ErrorMessage = "El nombre del solicitante es obligatorio.")]
    public string RequesterName { get; set; }
    public string? RequesterPhone { get; set; } = "Sin teléfono";
    [Required(ErrorMessage = "El teléfono del solicitante es obligatorio.")]
    public string RequesterMobilePhone { get; set; }
}