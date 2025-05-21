using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class MovementDetailDTO
{
    [Required(ErrorMessage = "Debe seleccionar un ítem.")]
    public int ItemId { get; set; }

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser al menos 1.")]
    public int Quantity { get; set; }
}
