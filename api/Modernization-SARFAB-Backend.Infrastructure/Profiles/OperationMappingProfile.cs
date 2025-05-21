using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Profiles;

public class OperationMappingProfile:Profile
{
    public OperationMappingProfile()
    {
        CreateMap<Department, DepartmentDTO>();
        CreateMap<Province, ProvinceDTO>();
        CreateMap<Municipality, MunicipalityDTO>();
        CreateMap<OperationCategory, OperationCategoryDTO>();
        CreateMap<OperationType, OperationTypeDTO>();
    }
}