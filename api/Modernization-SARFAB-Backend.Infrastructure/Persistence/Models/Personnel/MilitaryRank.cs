namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class MilitaryRank
{
    public int RankId { get; set; }

    public string Name { get; set; } = null!;
    public string Abbreviation { get; set; } = null!;

    public virtual ICollection<MilitaryRankAssignment> MilitaryRankAssignments { get; set; } = new List<MilitaryRankAssignment>();
}
