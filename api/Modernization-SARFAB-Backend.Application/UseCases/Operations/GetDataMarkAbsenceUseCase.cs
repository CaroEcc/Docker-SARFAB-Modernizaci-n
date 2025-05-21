using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetDataMarkAbsenceUseCase
{
    private readonly ISarOperationRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    
    public GetDataMarkAbsenceUseCase(ISarOperationRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<AbsenceMarkingDTO> ExecuteAsync(int operationId)
    {
        AbsenceMarkingDTO result = null;
        await _unitOfWork.ExecuteWithStrategyAsync(async () =>
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var operation = await _repository.GetOperationAbsenceMarkingAsync(operationId);
                if (operation == null)
                    throw new BusinessException("Operación no encontrada");
                var personnel = await _repository.GetOperationVolunteersAbsenceMarkingAsync(operationId);

                result = new AbsenceMarkingDTO
                {
                    Activity = operation.Activity,
                    DepartmentName = operation.DepartmentName,
                    MunicipalityName = operation.MunicipalityName,
                    ProvinceName = operation.ProvinceName,
                    DepartureDate = operation.DepartureDate,
                    ArrivalDate = operation.ArrivalDate,
                    Volunteers = personnel.ToList()
                };

                await _unitOfWork.CommitAsync();
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        });
        return result;
    }
}