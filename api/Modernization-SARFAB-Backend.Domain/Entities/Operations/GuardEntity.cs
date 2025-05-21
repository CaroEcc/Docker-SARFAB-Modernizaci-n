namespace Modernization_SARFAB_Backend.Domain.Entities.Operations
{
    public class GuardEntity
    {
        public int GuardId { get; set; }

        public DateOnly GuardDate { get; set; }

        public string Location { get; set; } = null!;

        public int ShiftId { get; set; }

        public string? Observations { get; set; }

        public short? UserId { get; set; }

        public GuardStatus? Status { get; set; }
        
        public enum GuardStatus
        {
            Deleted = 0,
            Active = 1
        }

    }
}
