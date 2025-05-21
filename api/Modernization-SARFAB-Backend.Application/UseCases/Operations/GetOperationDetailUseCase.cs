using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Exceptions;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class GetOperationDetailUseCase
    {
        private readonly ISarOperationRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public GetOperationDetailUseCase(ISarOperationRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<SarOperationDetailDTO> ExecuteAsync(int operationId)
        {
            SarOperationDetailDTO result = null;
    
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    var operation = await _repository.GetOperationByIdAsync(operationId);
                    if (operation == null)
                        throw new BusinessException("Operación no encontrada");

                    var responsible = await _repository.GetResponsibleByOperationIdAsync(operationId);
                    var personnel = await _repository.GetPersonnelByOperationIdAsync(operationId);

                    result = new SarOperationDetailDTO
                    {
                        OperationId = operation.OperationId,
                        OperationTypeName = operation.OperationTypeName,
                        CategoryName = operation.CategoryName,
                        DepartmentName = operation.DepartmentName,
                        MunicipalityName = operation.MunicipalityName,
                        ProvinceName = operation.ProvinceName,
                        Address = operation.Address,
                        DepartureDate = operation.DepartureDate,
                        ArrivalDate = operation.ArrivalDate,
                        Observations = operation.Observations,
                        OperationStatus = operation.OperationStatus,
                        RequesterName = operation.RequesterName,
                        RequesterPhone = operation.RequesterPhone ?? "Telefono no registrado",
                        RequesterMobile = operation.RequesterMobile ?? "Celular no registrado",
                        Responsible = responsible,
                        Personnel = personnel.ToList(),
                        RequesterId = operation.RequesterId,
                        OperationTypeId = operation.OperationTypeId,
                        MunicipalityId = operation.MunicipalityId
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
}
