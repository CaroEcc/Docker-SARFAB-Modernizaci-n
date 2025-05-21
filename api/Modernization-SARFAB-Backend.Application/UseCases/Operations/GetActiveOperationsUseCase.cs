using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class GetActiveOperationsUseCase
    {
        private readonly ISarOperationRepository _repository;

        public GetActiveOperationsUseCase(ISarOperationRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<ActiveOperationDTO> Data, int TotalPages)> ExecuteAsync(
            string searchTerm = null,
            int? status = (int)SarOperationEntity.OperationStatus.Active,
            int? municipalityId = null,
            int? categoryId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10)
        {
            return await _repository.GetActiveOperationsAsync(searchTerm, status, municipalityId, categoryId, startDate, endDate, page, pageSize);
        }
    }
}