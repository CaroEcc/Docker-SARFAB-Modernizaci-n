using AutoMapper;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Profiles;

public class CourseProfile: Profile
{
    public CourseProfile()
    {
        CreateMap<Course, CourseEntity>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                srcMember != null
            ));
    }
}