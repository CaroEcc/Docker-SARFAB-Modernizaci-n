namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

public partial class User
{
    public short UserId { get; set; }

    public int PersonId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;
    public string Email { get; set; } = null!;
    public sbyte Role { get; set; }
    public sbyte FirstLogin { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Person Person { get; set; } = null!;
}
