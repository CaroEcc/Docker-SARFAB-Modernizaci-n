using Modernization_SARFAB_Backend.Application.DTOs.Common;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

namespace Modernization_SARFAB_Backend.Application.Services.Operations;

public class OperationCategoryApplicationService
{
    private readonly CreateOperationCategoryUseCase _createOperationCategoryUseCase;
    private readonly UpdateOperationCategoryUseCase _updateOperationCategoryUseCase;
    private readonly GetCategoriesWithTypesUseCase _getCategoriesWithTypesUseCase;

    public OperationCategoryApplicationService(CreateOperationCategoryUseCase createOperationCategoryUseCase,
        UpdateOperationCategoryUseCase updateOperationCategoryUseCase,
        GetCategoriesWithTypesUseCase getCategoriesWithTypesUseCase)
    {
        _createOperationCategoryUseCase = createOperationCategoryUseCase;
        _updateOperationCategoryUseCase = updateOperationCategoryUseCase;
        _getCategoriesWithTypesUseCase = getCategoriesWithTypesUseCase;
    }

    public async Task CreateOperationCategoryAsync(CreateOperationCategoryDTO request, short userId, string userName)
        => await _createOperationCategoryUseCase.ExecuteAsync(request, userId, userName);
    public async Task UpdateOperationCategoryAsync(int operationCategoryId, UpdateOperationCategoryDTO dto, short userId, string userName)
        => await _updateOperationCategoryUseCase.ExecuteAsync(operationCategoryId, dto, userId, userName);
    public async Task<PagedResult<OperationCategoryWithTypesDTO>> GetCategoriesWithTypesAsync(
        string? searchTerm, int page, int pageSize)
        => await _getCategoriesWithTypesUseCase.ExecuteAsync(searchTerm, page, pageSize);
}