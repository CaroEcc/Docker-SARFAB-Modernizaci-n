using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class ChangePasswordDTO
    {
        public string UserName { get; set; } = string.Empty;
        [Required(ErrorMessage = "La contraseña es requerida")]
        public string LastPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        [MinLength(6, ErrorMessage = "La contraseña tener minimamente 6 caracteres")]
        public string NewPassword { get; set; } = string.Empty;
    }
}
