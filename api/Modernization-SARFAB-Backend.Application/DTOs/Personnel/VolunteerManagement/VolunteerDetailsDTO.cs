namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class VolunteerDetailsDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DepartmentName { get; set; }
        public string HomeAddress { get; set; }
        public string Ci { get; set; }
        public DateOnly BirthDate { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string GradeName { get; set; }
        public string Email { get; set; }
        public string? Occupation { get; set; }
        public string? Religion { get; set; }
        public string? Allergies { get; set; }
        public string? BloodType { get; set; }
        public string? DistinctiveFeatures { get; set; }
        public string VolunteerType { get; set; }
        public string EmergencyContactFullName { get; set; }
        public string EmergencyContactRelation { get; set; }
        public string? EmergencyContactAddress { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactMobile { get; set; }
    }
}
