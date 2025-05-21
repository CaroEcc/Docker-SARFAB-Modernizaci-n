using System.ComponentModel.DataAnnotations;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.RecruitmentEntity;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement
{
    public class UpdateRecruimentStatusDTO
    {
        [Required]
        public RecruitmentStatus Status { get; set; }
    }
}
