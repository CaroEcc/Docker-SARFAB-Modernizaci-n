using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class CreateVolunteerDTO
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "El apellido es obligatorio.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El apellido debe tener entre 2 y 50 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "El apellido no puede estar vacío o contener solo espacios.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "La dirección es obligatoria.")]
        [StringLength(255, ErrorMessage = "La dirección no puede tener más de 255 caracteres.")]
        public string HomeAddress { get; set; }

        [Required(ErrorMessage = "La cédula de identidad es obligatoria.")]
        [StringLength(10, MinimumLength = 5, ErrorMessage = "La cédula de identidad debe tener entre 5 y 10 caracteres.")]
        [RegularExpression(@"^\d+$", ErrorMessage = "La cédula de identidad solo puede contener números.")]
        public string Ci { get; set; }

        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria.")]
        public DateOnly BirthDate { get; set; }

        [Phone(ErrorMessage = "El número de teléfono no es válido.")]
        [StringLength(15, ErrorMessage = "El teléfono no puede tener más de 15 caracteres.")]
        public string? Phone { get; set; }

        [Phone(ErrorMessage = "El número de celular no es válido.")]
        [StringLength(15, ErrorMessage = "El celular no puede tener más de 15 caracteres.")]
        public string? MobilePhone { get; set; }

        [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
        public string Email { get; set; }

        [StringLength(255, ErrorMessage = "Las señas particulares no pueden tener más de 255 caracteres.")]
        public string? DistinctiveFeatures { get; set; }

        [Required(ErrorMessage = "El tipo de voluntario es obligatorio.")]
        [StringLength(50, ErrorMessage = "El tipo de voluntario no puede tener más de 50 caracteres.")]
        public string VolunteerType { get; set; }

        [StringLength(100, ErrorMessage = "La ocupación no puede tener más de 100 caracteres.")]
        public string? Occupation { get; set; }

        [StringLength(10, ErrorMessage = "El tipo de sangre no puede tener más de 10 caracteres.")]
        public string? BloodType { get; set; }

        [StringLength(50, ErrorMessage = "La religión no puede tener más de 50 caracteres.")]
        public string? Religion { get; set; }

        [StringLength(255, ErrorMessage = "Las alergias no pueden tener más de 255 caracteres.")]
        public string? Allergies { get; set; }

        [Required(ErrorMessage = "El nombre del contacto de emergencia es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre del contacto de emergencia no puede tener más de 100 caracteres.")]
        public string EmergencyContactFullName { get; set; }

        [Required(ErrorMessage = "La relación con el contacto de emergencia es obligatoria.")]
        [StringLength(50, ErrorMessage = "La relación con el contacto de emergencia no puede tener más de 50 caracteres.")]
        public string EmergencyContactRelation { get; set; }

        [StringLength(255, ErrorMessage = "La dirección del contacto de emergencia no puede tener más de 255 caracteres.")]
        public string? EmergencyContactAddress { get; set; }

        [Phone(ErrorMessage = "El número de teléfono del contacto de emergencia no es válido.")]
        [StringLength(15, ErrorMessage = "El teléfono del contacto de emergencia no puede tener más de 15 caracteres.")]
        public string? EmergencyContactPhone { get; set; }

        [Phone(ErrorMessage = "El número de celular del contacto de emergencia no es válido.")]
        [StringLength(15, ErrorMessage = "El celular del contacto de emergencia no puede tener más de 15 caracteres.")]
        public string? EmergencyContactMobile { get; set; }

        [Required(ErrorMessage = "Debe seleccionar un departamento")]
        public int? DepartmentId { get; set; }

        [Required(ErrorMessage = "Debe seleccionar un grado")]
        public int GradeId { get; set; }

        [Required(ErrorMessage = "La fecha del chequeo médico es obligatoria.")]
        public DateOnly CheckupDate { get; set; }

        [Required(ErrorMessage = "La fecha de expiración del chequeo médico es obligatoria.")]
        public DateOnly ExpirationDate { get; set; }

        [StringLength(255, ErrorMessage = "Las observaciones no pueden tener más de 255 caracteres.")]
        public string? Observations { get; set; } = "Ninguna";
    }
}
