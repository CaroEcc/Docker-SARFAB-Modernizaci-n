using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class UpdatePasswordDTO
    {
        [Required]
        public short UserId { get; set; }
        [Required(ErrorMessage = "La contraseña es requerida")]
        [MinLength(6, ErrorMessage = "La contraseña tener minimamente 6 caracteres")]
        public string Password { get; set; } = string.Empty;
    }
}
