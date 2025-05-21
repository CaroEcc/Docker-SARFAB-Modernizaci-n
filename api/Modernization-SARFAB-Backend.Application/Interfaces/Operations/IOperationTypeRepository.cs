using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations;

public interface IOperationTypeRepository
{
    Task CreateOperationTypeAsync(CreateOperationTypeDTO dto);
    Task UpdateAsync(int operationTypeId, UpdateOperationTypeDTO dto);
}