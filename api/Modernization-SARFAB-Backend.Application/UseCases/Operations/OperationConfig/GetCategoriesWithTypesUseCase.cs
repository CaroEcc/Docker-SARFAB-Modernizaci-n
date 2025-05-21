using Modernization_SARFAB_Backend.Application.DTOs.Common;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

public class GetCategoriesWithTypesUseCase
{
    private readonly IOperationCategoryRepository _repository;

    public GetCategoriesWithTypesUseCase(IOperationCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<OperationCategoryWithTypesDTO>> ExecuteAsync(
        string? searchTerm, int page, int pageSize)
    {
        return await _repository.GetCategoriesWithTypesAsync(searchTerm, page, pageSize);
    }
}