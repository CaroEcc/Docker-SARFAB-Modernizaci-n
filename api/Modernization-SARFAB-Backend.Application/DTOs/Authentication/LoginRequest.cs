using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Usuario requerido")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Contraseña requerida")]
        public string Password { get; set; }
    }
}
