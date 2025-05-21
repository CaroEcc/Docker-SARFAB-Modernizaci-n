namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication;

public class AuthUserDTO
{
    public short Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public byte Role { get; set; }
    public byte FirstLogin { get; set; }

    public AuthUserDTO(short id, string username, string email, string name, string lastname, byte role, byte firstLogin)
    {
        Id = id;
        Username = username;
        Email = email;
        Name = name;
        LastName = lastname;
        Role = role;
        FirstLogin = firstLogin;
    }
}