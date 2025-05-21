using System.ComponentModel.DataAnnotations;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class UpdateOperationStatusDTO
{
    [Required]
    public SarOperationEntity.OperationStatus Status { get; set; }

    [StringLength(255, ErrorMessage = "Las observaciones no pueden tener más de 255 caracteres.")]
    [RegularExpression(@"\S.*", ErrorMessage = "Las observaciones no pueden estar vacías o contener solo espacios.")]
    public string? Observations { get; set; }
}