namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;

public class CourseSelectDTO
{
    public int Id { get; set; }
    public string Name { get; set; }

    public CourseSelectDTO(int id, string name)
    {
        Id = id;
        Name = name;
    }
}