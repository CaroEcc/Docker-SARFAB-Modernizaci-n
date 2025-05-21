using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class AssignMultipleVolunteersToCourseDTO
{
    [Required(ErrorMessage = "Debe seleccionar un curso.")]
    public int CourseId { get; set; }

    [Required(ErrorMessage = "Debe asignar al menos un voluntario.")]
    [MinLength(1, ErrorMessage = "Debe haber al menos un voluntario en la lista.")]
    public List<VolunteerAssignmentDTO> Volunteers { get; set; } = new List<VolunteerAssignmentDTO>();
}