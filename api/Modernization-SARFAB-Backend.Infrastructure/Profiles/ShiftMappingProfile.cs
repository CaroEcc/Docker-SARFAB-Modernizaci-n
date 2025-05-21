using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Profiles
{
    public class ShiftMappingProfile : Profile
    {
        public ShiftMappingProfile()
        {
            CreateMap<Shift, ShiftDTO>();
        }
    }
}
