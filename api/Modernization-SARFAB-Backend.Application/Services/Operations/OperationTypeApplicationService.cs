using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.OperationConfig;

namespace Modernization_SARFAB_Backend.Application.Services.Operations;

public class OperationTypeApplicationService
{
    private readonly CreateOperationTypeUseCase _createOperationTypeUseCase;
    private readonly UpdateOperationTypeUseCase _updateOperationTypeUseCase;

    public OperationTypeApplicationService(CreateOperationTypeUseCase createOperationTypeUseCase,
        UpdateOperationTypeUseCase updateOperationTypeUseCase)
    {
        _createOperationTypeUseCase = createOperationTypeUseCase;
        _updateOperationTypeUseCase = updateOperationTypeUseCase;
    }

    public async Task CreateOperationTypeAsync(CreateOperationTypeDTO request, short userId, string userName)
        => await _createOperationTypeUseCase.ExecuteAsync(request, userId, userName);
    public async Task UpdateOperationTypeAsync(int operationTypeId, UpdateOperationTypeDTO dto, short userId, string userName)
        => await _updateOperationTypeUseCase.ExecuteAsync(operationTypeId, dto, userId, userName);
}