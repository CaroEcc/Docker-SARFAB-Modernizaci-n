using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;

public class CreateOperationTypeDTO
{
    [Required(ErrorMessage = "El nombre del tipo de operación es obligatorio.")]
    [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Debe seleccionar una categoría de operación.")]
    public int OperationCategoryId { get; set; }
}