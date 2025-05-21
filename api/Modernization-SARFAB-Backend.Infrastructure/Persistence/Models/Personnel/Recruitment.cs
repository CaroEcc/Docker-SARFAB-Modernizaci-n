namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class Recruitment
{
    public int RecruitmentId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Ci { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public bool WantsMilitaryService { get; set; }

    /// <summary>
    /// 0: No apto, 1: En proceso, 2: Apto
    /// </summary>
    public sbyte? Status { get; set; }

    public short? UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
