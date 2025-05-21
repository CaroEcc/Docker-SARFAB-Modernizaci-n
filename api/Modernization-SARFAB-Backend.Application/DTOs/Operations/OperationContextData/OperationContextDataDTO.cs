namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;

public class OperationContextDataDTO
{
    public List<DepartmentDTO> Departments { get; set; } = new List<DepartmentDTO>();
    public List<ProvinceDTO> Provinces { get; set; } = new List<ProvinceDTO>();
    public List<MunicipalityDTO> Municipalities { get; set; } = new List<MunicipalityDTO>();
    public List<OperationCategoryDTO> OperationCategories { get; set; } = new List<OperationCategoryDTO>();
    public List<OperationTypeDTO> OperationTypes { get; set; } = new List<OperationTypeDTO>();
}