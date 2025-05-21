using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication.UserManagement
{
    public class CreateUserDTO
    {
        public int PersonId { get; set; }
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        [MaxLength(50, ErrorMessage = "EL nombre de usuario no debe tener más de 50 caracteres")]
        public string UserName { get; set; } = string.Empty;
        [Required(ErrorMessage = "El correo electrónico es requerido")]
        [MaxLength(100, ErrorMessage = "El correo electrónico no debe tener más de 100 caracteres")]
        [EmailAddress(ErrorMessage = "El correo electrónico no tiene el formato correcto")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "El rol es requerido")]
        public byte Role { get; set; }
    }
}
