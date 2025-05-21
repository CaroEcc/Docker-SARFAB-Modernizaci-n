using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.DataContext;

public class GetDepartmentsUseCase
{
    private readonly IContextDataRepository _repository;

    public GetDepartmentsUseCase(IContextDataRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<DepartmentDTO>> ExecuteAsync()
    {
        return await _repository.GetDepartmentsAsync();
    }
}