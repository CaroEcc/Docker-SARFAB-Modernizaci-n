using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class UpdateMedicalCheckupDTO
    {
        public DateOnly? CheckupDate { get; set; }
        
        public DateOnly? ExpirationDate { get; set; }

        [StringLength(255, ErrorMessage = "Las observaciones no pueden tener más de 255 caracteres.")]
        [RegularExpression(@"^\S.*$", ErrorMessage = "Las observaciones no pueden estar vacías o contener solo espacios.")]
        public string? Observations { get; set; }
    }
}