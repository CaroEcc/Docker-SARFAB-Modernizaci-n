namespace Modernization_SARFAB_Backend.Domain.Entities.Operations
{
    public class VoluntareeGuardEntity
    {
        public int VoluntareeId { get; set; }
        public int GuardId { get; set; }
        public string Role { get; set; }
        public byte Status { get; set; }
        public short UserId{ get; set; }
    }
}
