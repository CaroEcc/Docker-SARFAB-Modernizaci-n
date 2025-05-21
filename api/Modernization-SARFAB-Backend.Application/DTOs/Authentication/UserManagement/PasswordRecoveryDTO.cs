using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class PasswordRecoveryDTO
    {
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string UserName { get; set; } = string.Empty;
        [Required(ErrorMessage = "El correo electrónico es requerido")]
        [EmailAddress(ErrorMessage = "El correo electrónico no tiene el formato correcto")]
        public string Email { get; set; } = string.Empty;
    }
}
