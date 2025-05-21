using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement
{
    public class CreateRecruitmentDTO
    {
        [Required(ErrorMessage = "El nombre es requerido.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "El apellido es requerido.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El apellido debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El apellido no puede estar vacío o contener solo espacios.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "La cédula de identidad es requerida.")]
        [StringLength(10, MinimumLength = 5, ErrorMessage = "La cédula de identidad debe tener entre 5 y 10 caracteres.")]
        [RegularExpression(@"^\d+$", ErrorMessage = "La cédula de identidad solo puede contener números.")]
        public string CI { get; set; }

        [Required(ErrorMessage = "La fecha de nacimiento es requerida.")]
        public DateOnly BirthDate { get; set; }

        public bool WantsMilitaryService { get; set; }
    }
}