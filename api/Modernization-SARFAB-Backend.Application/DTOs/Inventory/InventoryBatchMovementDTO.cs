using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Inventory;

public class InventoryBatchMovementDTO
{
    [Required(ErrorMessage = "Debe seleccionar un voluntario.")]
    public int VolunteerId { get; set; }
    [Required(ErrorMessage = "Debe proporcionar al menos un ítem en el movimiento.")]
    [MinLength(1, ErrorMessage = "Debe haber al menos un ítem en la lista.")]
    public List<MovementDetailDTO> Items { get; set; }
}