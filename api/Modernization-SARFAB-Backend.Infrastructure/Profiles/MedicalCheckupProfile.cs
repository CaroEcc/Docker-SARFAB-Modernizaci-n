using AutoMapper;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Profiles
{
    public class MedicalCheckupProfile : Profile
    {
        public MedicalCheckupProfile()
        {
            CreateMap<MedicalCheckup, MedicalCheckupEntity>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null
                ));
        }
    }
}
