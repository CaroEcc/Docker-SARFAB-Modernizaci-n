using Modernization_SARFAB_Backend.Application.DTOs.Common;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations;

public interface IOperationCategoryRepository
{
    Task CreateAsync(CreateOperationCategoryDTO dto);
    Task UpdateAsync(int operationCategoryId, UpdateOperationCategoryDTO dto);
    Task<PagedResult<OperationCategoryWithTypesDTO>> GetCategoriesWithTypesAsync(
        string? searchTerm,
        int page, 
        int pageSize);
}