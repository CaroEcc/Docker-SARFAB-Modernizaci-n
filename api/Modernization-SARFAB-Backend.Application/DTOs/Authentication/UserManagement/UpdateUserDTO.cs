using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class UpdateUserDTO
    {
        public short UserId { get; set; }
        [Required(ErrorMessage = "El correo electrónico es requerido")]
        [MaxLength(100, ErrorMessage = "El correo electrónico no debe tener más de 100 caracteres")]
        [EmailAddress(ErrorMessage = "el correo electrónico no tiene el formato correcto")]
        public string Email { get; set; }
    }
}
