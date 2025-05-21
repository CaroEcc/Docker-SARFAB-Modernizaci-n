using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class AssignCourseDTO
{
    [Required(ErrorMessage = "Debe seleccionar un voluntario.")]
    public int VolunteerId { get; set; }

    [Required(ErrorMessage = "Debe seleccionar un curso.")]
    public int CourseId { get; set; }

    [Required(ErrorMessage = "Debe proporcionar una fecha de finalización.")]
    public DateOnly CompletionDate { get; set; }
}