using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class CreateItemDTO
{
    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(100, ErrorMessage = "El nombre del ítem no puede tener más de 100 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser al menos 1.")]
    public int Quantity { get; set; }
}