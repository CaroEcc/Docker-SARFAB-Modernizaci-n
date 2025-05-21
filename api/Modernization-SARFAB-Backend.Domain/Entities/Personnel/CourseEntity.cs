namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class CourseEntity
    {
        public int CourseId { get; private set; }

        public string Name { get; private set; }

        public string? Description { get; private set; }

        public short? UserId { get; private set; }

        public CourseEntity(int courseId, string name, string? description, short userId = 0)
        {
            CourseId = courseId;
            Name = name;
            Description = description;
            UserId = userId;
        }

        public CourseEntity(string name, string description, short userId = 0)
        {
            Name = name;
            Description = description;
            UserId = userId;
        }

        public CourseEntity(string name) => Name = name;
        
        public void UpdateDetails(string? name, string? description)
        {
            Name = name ?? Name;
            Description = description ?? Description;
        }
    }
}
