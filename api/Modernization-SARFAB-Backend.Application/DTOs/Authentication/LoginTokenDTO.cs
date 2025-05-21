namespace Modernization_SARFAB_Backend.Application.DTOs.Authentication;

public class LoginTokenDTO
{
    public string Token { get; set; }

    public LoginTokenDTO(string token)
    {
        Token = token;
    }
}