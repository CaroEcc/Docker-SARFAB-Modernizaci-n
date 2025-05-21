namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class CompletedCourseDTO
{
    public string CourseName { get; set; }
    public DateOnly CompletionDate { get; set; }
    public string Description { get; set; }

    public CompletedCourseDTO(string courseName, DateOnly completionDate, string description)
    {
        CourseName = courseName;
        CompletionDate = completionDate;
        Description = description;
    }
}
