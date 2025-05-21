

namespace Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement
{
    public class MilitaryDTO
    {
        public int Id { get; set; }             
        public string FirstName { get; set; }    
        public string LastName { get; set; }      
        public string MobilePhone { get; set; }
        public string RankName { get; set; }
        public int Status { get; set; }
        public bool? CanPromote { get; set; }
    }
}

