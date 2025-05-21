namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class PersonEntity
    {
        public int Id { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public PersonStatus Status { get; private set; }
        public short? UserId { get; private set; }

        // Constructor
        public PersonEntity(string firstName, string lastName, short userId = 0)
        {
            FirstName = firstName;
            LastName = lastName;
            Status = PersonStatus.Active;
            UserId = userId;
        }
        public PersonEntity(int id, string firstName, string lastName, short userId = 0)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            UserId = userId;
        }
        public PersonEntity(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public enum PersonStatus
        {
            Deleted = 0,
            Active = 1
        }

        // Reglas de negocio (ejemplos)
        public void DeletePerson() => Status = PersonStatus.Deleted;
        public void ActivatePerson() => Status = PersonStatus.Active;
        public void UpdateName(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

    }
}
