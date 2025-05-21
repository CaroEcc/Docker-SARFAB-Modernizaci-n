using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement
{
    public class RecruitmentDTO
    {
        public int RecruitmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Ci { get; set; }
        public DateOnly BirthDate { get; set; }
        public bool WantsMilitaryService { get; set; }
        public RecruitmentEntity.RecruitmentStatus Status { get; set; }
    }
}
