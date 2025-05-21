using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.UseCases.Operations;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.Services.Operations
{
    public class SarOperationApplicationService
    {
        private readonly CreateSarOperationUseCase _createSarOperationUseCase;
        private readonly UpdateSarOperationUseCase _updateSarOperationUseCase;
        private readonly GetActiveOperationsUseCase _getActiveOperationsUseCase;
        private readonly UpdateOperationStatusUseCase _updateOperationStatusUseCase;
        private readonly GetOperationDetailUseCase _getOperationDetailUseCase;
        private readonly GetDataMarkAbsenceUseCase _getDataMarkAbsenceUseCase;
        private readonly UpdateStatusPersonOperationUseCase _updateStatusPersonOperationUseCase;

        public SarOperationApplicationService(CreateSarOperationUseCase createSarOperationUseCase,
            UpdateSarOperationUseCase updateSarOperationUseCase,
            GetActiveOperationsUseCase getActiveOperationsUseCase,
            UpdateOperationStatusUseCase updateOperationStatusUseCase,
            GetOperationDetailUseCase getOperationDetailUseCase,
            GetDataMarkAbsenceUseCase getDataMarkAbsenceUseCase,
            UpdateStatusPersonOperationUseCase updateStatusPersonOperationUseCase)
        {
            _createSarOperationUseCase = createSarOperationUseCase;
            _updateSarOperationUseCase = updateSarOperationUseCase;
            _getActiveOperationsUseCase = getActiveOperationsUseCase;
            _updateOperationStatusUseCase = updateOperationStatusUseCase;
            _getOperationDetailUseCase = getOperationDetailUseCase;
            _getDataMarkAbsenceUseCase = getDataMarkAbsenceUseCase;
            _updateStatusPersonOperationUseCase = updateStatusPersonOperationUseCase;
        }
        public async Task CreateAsync(CreateSarOperationDTO request, short userId, string userName)
            => await _createSarOperationUseCase.ExecuteAsync(request, userId, userName);
        public async Task UpdateAsync(int operationId, UpdateSarOperationDTO dto, short userId, string userName)
            => await _updateSarOperationUseCase.ExecuteAsync(operationId, dto, userId, userName);
        
        public async Task<(IEnumerable<ActiveOperationDTO> Data, int TotalPages)> GetActiveOperationsAsync(
            string searchTerm = null,
            int? status = (int)SarOperationEntity.OperationStatus.Active,
            int? municipalityId = null,
            int? categoryId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10)
            => await _getActiveOperationsUseCase.ExecuteAsync(searchTerm, status, municipalityId, categoryId, startDate, endDate, page, pageSize);
        
        public async Task UpdateOperationStatusAsync(int operationId, SarOperationEntity.OperationStatus status, string userName, string? observations = null)
            => await _updateOperationStatusUseCase.ExecuteAsync(operationId, status, userName, observations);
        
        public async Task<SarOperationDetailDTO> GetOperationDetailAsync(int operationId)
            => await _getOperationDetailUseCase.ExecuteAsync(operationId);
        
        public async Task<AbsenceMarkingDTO> GetDataMarkAbsenceAsync(int operationId)
            => await _getDataMarkAbsenceUseCase.ExecuteAsync(operationId);
        
        public async Task UpdateStatusPersonOperationAsync(PersonOperationEntity personOperationEntity)
            => await _updateStatusPersonOperationUseCase.ExecuteAsync(personOperationEntity);
    }
}