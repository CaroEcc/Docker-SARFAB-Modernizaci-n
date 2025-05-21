
using System.ComponentModel.DataAnnotations;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.MilitaryEntity;

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement
{
    public class UpdateMilitaryStatusDTO
    {
        [Required]
        public MilitaryStatus Status { get; set; }
    }
}
