using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.VolunteerEntity;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement
{
    public class HistoricalListVolunteersDTO
    {
        public int VolunteerId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string GradeName { get; set; }
        public DateOnly DapartureDate { get; set; }
        public string Reason { get; set; }
        public VolunteerStatus volunteerStatus { get; set; }

    }
}
