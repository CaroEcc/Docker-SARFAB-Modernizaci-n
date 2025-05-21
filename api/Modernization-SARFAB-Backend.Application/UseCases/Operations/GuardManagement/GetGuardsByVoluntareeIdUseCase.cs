using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{

    public class GetGuardsByVoluntareeIdUseCase
    {
        private readonly IGuardRepository _repository;

        public GetGuardsByVoluntareeIdUseCase(IGuardRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<ReportGuardDTO>, int totalPages)> Execute(int id, string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
        {
            var result = await _repository.GetGuardsByVoluntareeIdAsync(id, query, status, shift, startDate, endDate, page, limit);
            return result;
        }
    }
}
