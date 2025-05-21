using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class CreateSarOperationDTO
{
    [Required(ErrorMessage = "La dirección es obligatoria.")]
    [StringLength(255, ErrorMessage = "La dirección no puede tener más de 255 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "La dirección no puede estar vacía o contener solo espacios.")]
    public string Address { get; set; }

    [Required(ErrorMessage = "La fecha de salida es obligatoria.")]
    public DateTime DepartureDate { get; set; }

    public DateTime? ArrivalDate { get; set; }

    [Required(ErrorMessage = "Debe seleccionar un tipo de operación.")]
    public int OperationTypeId { get; set; }

    [Required(ErrorMessage = "Debe seleccionar un municipio.")]
    public int MunicipalityId { get; set; }

    [Required(ErrorMessage = "Debe asignar un responsable a la operación.")]
    public OperationPersonDTO Responsible { get; set; }

    [MinLength(1, ErrorMessage = "Debe haber al menos una persona en el personal asignado.")]
    public List<OperationPersonDTO> Personnel { get; set; } = new List<OperationPersonDTO>();
    public CreateRequesterDTO Requester { get; set; } = null!;
}