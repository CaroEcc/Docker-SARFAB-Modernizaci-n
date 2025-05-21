using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;

namespace Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;

public class OperationCategoryWithTypesDTO
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public List<OperationTypeDTO> Operations { get; set; } = new();
}