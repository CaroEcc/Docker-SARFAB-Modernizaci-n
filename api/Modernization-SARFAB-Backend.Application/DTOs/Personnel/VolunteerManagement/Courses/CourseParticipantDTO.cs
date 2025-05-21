namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class CourseParticipantDTO
{
    public string FullName { get; set; } = string.Empty;
    public string Rank { get; set; } = string.Empty;
    public DateOnly CompletionDate { get; set; }
}
