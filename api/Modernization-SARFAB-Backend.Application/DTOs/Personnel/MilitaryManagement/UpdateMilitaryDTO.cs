using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement
{
    public class UpdateMilitaryDTO
    {
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
        public string? FirstName { get; set; }

        [StringLength(50, MinimumLength = 2, ErrorMessage = "El apellido debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El apellido no puede estar vacío o contener solo espacios.")]
        public string? LastName { get; set; }

        [Phone(ErrorMessage = "El número de teléfono no es válido.")]
        [StringLength(15, ErrorMessage = "El número de teléfono no puede tener más de 15 caracteres.")]
        public string? MobilePhone { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "El ID del rango militar debe ser un número válido.")]
        public int? MilitaryRankId { get; set; }
    }
}