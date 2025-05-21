namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;

public class DataOperationListFilterDTO
{
    public List<MunicipalityDTO> Municipalities { get; set; } = new List<MunicipalityDTO>();
    public List<OperationCategoryDTO> OperationCategories { get; set; } = new List<OperationCategoryDTO>();
}