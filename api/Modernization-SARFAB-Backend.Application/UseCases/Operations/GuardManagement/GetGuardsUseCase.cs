using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{
    public class GetGuardsUseCase
    {
        private readonly IGuardRepository _repository;

        public GetGuardsUseCase(IGuardRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<GuardDTO>, int totalPages)> Execute(string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
        {
            var result = await _repository.GetGuardsAsync(query, status, shift, startDate, endDate, page, limit);
            return result;
        }
    }
}
