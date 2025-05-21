
namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class VolunteerListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Ci { get; set; }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string GradeName { get; set; }
        public bool? CanPromote { get; set; }
    }
}
