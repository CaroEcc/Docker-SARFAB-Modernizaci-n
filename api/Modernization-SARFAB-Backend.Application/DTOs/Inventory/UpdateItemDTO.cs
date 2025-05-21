using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class UpdateItemDTO
{
    [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
    public string? Name { get; set; }
    [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser al menos 1.")]
    public int? Quantity { get; set; }
}