namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel;

public class VolunteerCourseEntity
{
    public int VolunteerId { get; }
    public int CourseId { get; }
    public DateOnly CompletionDate { get; private set; }
    public short UserId { get; }

    public VolunteerCourseEntity(int volunteerId, int courseId, DateOnly completionDate, short userId = 0)
    {
        VolunteerId = volunteerId;
        CourseId = courseId;
        CompletionDate = completionDate;
        UserId = userId;
    }
    
    public void UpdateCompletionDate(DateOnly newDate)
    {
        CompletionDate = newDate;
    }
}
