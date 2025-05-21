using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Modernization_SARFAB_Backend.Application.Services.Common;

public class UserContextService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContextService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public (short userId, string userName)? GetUserClaims()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        if (user == null) return null;

        var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
        var userNameClaim = user.FindFirst(ClaimTypes.Name);

        if (userIdClaim == null || userNameClaim == null)
            return null;

        return (short.Parse(userIdClaim.Value), userNameClaim.Value);
    }
}
