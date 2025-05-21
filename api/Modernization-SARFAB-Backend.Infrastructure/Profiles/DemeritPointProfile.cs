using AutoMapper;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Profiles;

public class DemeritPointProfile: Profile
{
    public DemeritPointProfile()
    {
        CreateMap<DemeritPoint, DemeritPointEntity>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                srcMember != null
            ));
    }
}