namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class VolunteerGradeEntity
    {
        public int Id { get; private set; }
        public int VolunteerId { get; private set; }
        public int GradeId { get; private set; }
        public short? UserId { get; private set; }

        public VolunteerGradeEntity(int volunteerId, int gradeId, short userId = 0)
        {
            VolunteerId = volunteerId;
            GradeId = gradeId;
            UserId = userId;
        }

        public void Promote(int newGradeId)
        {
            GradeId = newGradeId;
        }
    }
}
