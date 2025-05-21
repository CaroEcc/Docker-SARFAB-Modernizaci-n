using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MedicalCheckupEntity, VolunteerMedicalCheckDTO>().ReverseMap();
            CreateMap<CourseEntity, CourseDTO>().ReverseMap();
            CreateMap<DemeritPointEntity, ListLostPointsDTO>().ReverseMap();
            CreateMap<RecruitmentEntity, RecruitmentDTO>().ReverseMap();
        }
    }
}
