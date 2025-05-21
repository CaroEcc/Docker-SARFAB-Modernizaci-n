namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class MilitaryEntity
    {
        public int Id { get; private set; }
        public int PersonId { get; private set; }
        public PersonEntity Person { get; private set; } 
        public string? MobilePhone { get; private set; }
        public MilitaryStatus Status { get; private set; } 
        public short? UserId { get; private set; }

        // Constructor
        public MilitaryEntity(PersonEntity person, string mobilePhone, short userId = 0)
        {
            PersonId = person.Id;
            Person = person;
            MobilePhone = mobilePhone;
            Status = MilitaryStatus.Active;
            UserId = userId;
        }
        public MilitaryEntity(int personId)
        {
            PersonId = personId;
        }
        
        public MilitaryEntity(int id, PersonEntity person, string mobilePhone, short? userId = 0, MilitaryStatus status = MilitaryStatus.Active)
        {
            Id = id;
            PersonId = person.Id;
            Person = person;
            MobilePhone = mobilePhone;
            Status = status;
            UserId = userId;
        }

        public void UpdateMobilePhone(string? mobilePhone)
        {
            MobilePhone = string.IsNullOrWhiteSpace(mobilePhone) ? null : mobilePhone;
        }

        public enum MilitaryStatus
        {
            Active = 1,
            Inactive = 0
        }

        public void ActivateMilitary() => Status = MilitaryStatus.Active;
        public void DeactivateMilitary() => Status = MilitaryStatus.Inactive;
        public void UpdateDetails(string? newFirstName, string? newLastName, string? newMobilePhone)
        {
            var updatedFirstName = string.IsNullOrWhiteSpace(newFirstName) ? Person.FirstName : newFirstName;
            var updatedLastName = string.IsNullOrWhiteSpace(newLastName) ? Person.LastName : newLastName;

            Person.UpdateName(updatedFirstName, updatedLastName);

            UpdateMobilePhone(newMobilePhone);
        }

    }
}