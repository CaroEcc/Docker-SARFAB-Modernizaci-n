using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetOperationCategoryUseCase
{
    private readonly IContextDataRepository _contextDataRepository;
    
    public GetOperationCategoryUseCase(IContextDataRepository contextDataRepository)
    {
        _contextDataRepository = contextDataRepository;
    }
    
    public async Task<IEnumerable<OperationCategoryDTO>> ExecuteAsync()
    {
        return await _contextDataRepository.GetOperationCategoriesAsync();
    }
}