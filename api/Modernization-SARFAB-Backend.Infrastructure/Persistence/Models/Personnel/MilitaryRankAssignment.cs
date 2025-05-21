namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class MilitaryRankAssignment
{
    public int AssignmentId { get; set; }

    public int MilitaryId { get; set; }

    public int RankId { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Military Military { get; set; } = null!;

    public virtual MilitaryRank Rank { get; set; } = null!;
}
