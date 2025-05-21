using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class UpdateCourseDTO
{
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    [RegularExpression(@"^\S.*$", ErrorMessage = "El nombre no puede estar vacío o contener solo espacios.")]
    public string? Name { get; set; }

    [StringLength(500, ErrorMessage = "La descripción no puede tener más de 500 caracteres.")]
    [RegularExpression(@"^\S.*$", ErrorMessage = "La descripción no puede estar vacía o contener solo espacios.")]
    public string? Description { get; set; }
}