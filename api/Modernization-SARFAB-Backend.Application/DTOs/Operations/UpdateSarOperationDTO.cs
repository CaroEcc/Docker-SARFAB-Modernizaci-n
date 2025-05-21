using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations
{
    public class UpdateSarOperationDTO
    {
        [StringLength(255, ErrorMessage = "La dirección no puede tener más de 255 caracteres.")]
        [RegularExpression(@"\S.*", ErrorMessage = "La dirección no puede estar vacía o contener solo espacios.")]
        public string? Address { get; set; }

        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Debe seleccionar un tipo de operación válido.")]
        public int? OperationTypeId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Debe seleccionar un municipio válido.")]
        public int? MunicipalityId { get; set; }
        
        [StringLength(255, ErrorMessage = "Las observaciones no pueden tener más de 255 caracteres.")]
        [RegularExpression(@"\S.*", ErrorMessage = "Las observaciones no pueden estar vacías o contener solo espacios.")]
        public string? Observations { get; set; }

        public OperationPersonDTO? Responsible { get; set; }
        public List<OperationPersonDTO>? Personnel { get; set; }
        
        public CreateRequesterDTO Requester { get; set; }
    }
}