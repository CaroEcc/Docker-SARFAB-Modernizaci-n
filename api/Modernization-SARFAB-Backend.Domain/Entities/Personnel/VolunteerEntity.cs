namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class VolunteerEntity
    {
        public int VolunteerId { get; private set; }
        public int PersonId { get; private set; }
        public PersonEntity Person { get; private set; }
        public string HomeAddress { get; private set; }
        public string Ci { get; private set; }
        public DateOnly BirthDate { get; private set; }
        public string? Phone { get; private set; }
        public string? MobilePhone { get; private set; }
        public string Email { get; private set; }
        public string? DistinctiveFeatures { get; private set; }
        public string VolunteerType { get; private set; }
        public string? Occupation { get; private set; }
        public string? BloodType { get; private set; }
        public string? Religion { get; private set; }
        public string? Allergies { get; private set; }
        public string EmergencyContactFullName { get; private set; }
        public string EmergencyContactRelation { get; private set; }
        public string? EmergencyContactAddress { get; private set; }
        public string? EmergencyContactPhone { get; private set; }
        public string? EmergencyContactMobile { get; private set; }
        public int? DepartmentId { get; private set; }
        public VolunteerStatus Status { get; private set; }
        public string? DischargeReason { get; private set; }
        public short? UserId { get; private set; }
        public DateOnly? UpdatedAt { get; set; }

        // Constructor

        public VolunteerEntity(
            PersonEntity person, string homeAddress, string ci, DateOnly birthDate,
            string? phone, string? mobilePhone, string email, string? distinctiveFeatures,
            string volunteerType, string? occupation, string? bloodType, string? religion, string? allergies,
            string emergencyContactFullName, string emergencyContactRelation, string? emergencyContactAddress,
            string? emergencyContactPhone, string? emergencyContactMobile, int? departmentId,
            short userId = 0)
        {
            PersonId = person.Id;
            Person = person;
            HomeAddress = homeAddress;
            Ci = ci;
            BirthDate = birthDate;
            Phone = phone;
            MobilePhone = mobilePhone;
            Email = email;
            DistinctiveFeatures = distinctiveFeatures;
            VolunteerType = volunteerType;
            Occupation = occupation;
            BloodType = bloodType;
            Religion = religion;
            Allergies = allergies;
            EmergencyContactFullName = emergencyContactFullName;
            EmergencyContactRelation = emergencyContactRelation;
            EmergencyContactAddress = emergencyContactAddress;
            EmergencyContactPhone = emergencyContactPhone;
            EmergencyContactMobile = emergencyContactMobile;
            DepartmentId = departmentId;
            Status = VolunteerStatus.Active;
            UserId = userId;
        }

        public VolunteerEntity(int id, PersonEntity person, string ci, string mobilePhone, string email)
        {
            VolunteerId = id;
            Person = person;
            Ci = ci;
            MobilePhone = mobilePhone;
            Email = email;
        }

        public VolunteerEntity(int id, PersonEntity person, DateOnly? departureDate, string reason, VolunteerStatus volunteerStatus)
        {
            VolunteerId = id;
            Person = person;
            UpdatedAt = departureDate;
            DischargeReason = reason;
            Status = volunteerStatus;
        }

        public VolunteerEntity(
                int id,
                PersonEntity person,
                string homeAddress,
                string ci,
                DateOnly birthDate,
                string? phone,
                string? mobilePhone,
                string email,
                string? occupation,
                string? religion,
                string? allergies,
                string? bloodType,
                string? distinctiveFeatures,
                string volunteerType,
                string emergencyContactFullName,
                string emergencyContactRelation,
                string? emergencyContactAddress,
                string? emergencyContactPhone,
                string? emergencyContactMobile)
        {
            VolunteerId = id;
            Person = person;
            HomeAddress = homeAddress;
            Ci = ci;
            BirthDate = birthDate;
            Phone = phone;
            MobilePhone = mobilePhone;
            Email = email;
            Occupation = occupation;
            Religion = religion;
            Allergies = allergies;
            BloodType = bloodType;
            DistinctiveFeatures = distinctiveFeatures;
            VolunteerType = volunteerType;
            EmergencyContactFullName = emergencyContactFullName;
            EmergencyContactRelation = emergencyContactRelation;
            EmergencyContactAddress = emergencyContactAddress;
            EmergencyContactPhone = emergencyContactPhone;
            EmergencyContactMobile = emergencyContactMobile;
        }

        public VolunteerEntity(VolunteerStatus status, string reason)
        {
            Status = status;
            DischargeReason = reason;
        }
        public VolunteerEntity(int personId)
        {
            PersonId = personId;
        }

        public void UpdateDetails(
            string? newFirstName, string? newLastName, string? newHomeAddress, string? newCi,
            DateOnly? newBirthDate, string? newPhone, string? newMobilePhone, string? newEmail,
            string? newDistinctiveFeatures, string? newVolunteerType, string? newOccupation,
            string? newBloodType, string? newReligion, string? newAllergies,
            string? newEmergencyContactFullName, string? newEmergencyContactRelation,
            string? newEmergencyContactAddress, string? newEmergencyContactPhone,
            string? newEmergencyContactMobile, int? newDepartmentId)
        {
            var updatedFirstName = string.IsNullOrWhiteSpace(newFirstName) ? Person.FirstName : newFirstName;
            var updatedLastName = string.IsNullOrWhiteSpace(newLastName) ? Person.LastName : newLastName;
            Person.UpdateName(updatedFirstName, updatedLastName);
            HomeAddress = string.IsNullOrWhiteSpace(newHomeAddress) ? HomeAddress : newHomeAddress;
            Ci = string.IsNullOrWhiteSpace(newCi) ? Ci : newCi;
            BirthDate = newBirthDate ?? BirthDate;
            Phone = string.IsNullOrWhiteSpace(newPhone) ? Phone : newPhone;
            MobilePhone = string.IsNullOrWhiteSpace(newMobilePhone) ? MobilePhone : newMobilePhone;
            Email = string.IsNullOrWhiteSpace(newEmail) ? Email : newEmail;
            DistinctiveFeatures = string.IsNullOrWhiteSpace(newDistinctiveFeatures) ? DistinctiveFeatures : newDistinctiveFeatures;
            VolunteerType = string.IsNullOrWhiteSpace(newVolunteerType) ? VolunteerType : newVolunteerType;
            Occupation = string.IsNullOrWhiteSpace(newOccupation) ? Occupation : newOccupation;
            BloodType = string.IsNullOrWhiteSpace(newBloodType) ? BloodType : newBloodType;
            Religion = string.IsNullOrWhiteSpace(newReligion) ? Religion : newReligion;
            Allergies = string.IsNullOrWhiteSpace(newAllergies) ? Allergies : newAllergies;
            EmergencyContactFullName = string.IsNullOrWhiteSpace(newEmergencyContactFullName) ? EmergencyContactFullName : newEmergencyContactFullName;
            EmergencyContactRelation = string.IsNullOrWhiteSpace(newEmergencyContactRelation) ? EmergencyContactRelation : newEmergencyContactRelation;
            EmergencyContactAddress = string.IsNullOrWhiteSpace(newEmergencyContactAddress) ? EmergencyContactAddress : newEmergencyContactAddress;
            EmergencyContactPhone = string.IsNullOrWhiteSpace(newEmergencyContactPhone) ? EmergencyContactPhone : newEmergencyContactPhone;
            EmergencyContactMobile = string.IsNullOrWhiteSpace(newEmergencyContactMobile) ? EmergencyContactMobile : newEmergencyContactMobile;
            DepartmentId = newDepartmentId ?? DepartmentId;
        }


        public void DeactiveVolunteer(string reason)
        {
            Status = VolunteerStatus.Deleted;
            DischargeReason = reason;
        }

        public void ActivateVolunteer()
        {
            Status = VolunteerStatus.Active;
        }

        public void CompleteService(string reason)
        {
            Status = VolunteerStatus.ServiceCompleted;
            DischargeReason = reason;
        }

        public enum VolunteerStatus
        {
            Deleted = 0,
            Active = 1,
            ServiceCompleted = 2,
            //Discharged = 3
        }
        
    }
}
