using Modernization_SARFAB_Backend.Domain.Entities.Authentication;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Authentication
{
    public interface ITokenService
    {
        string GenerateToken(UserEntity user);
    }
}
