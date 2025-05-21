using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Operations.GuardManagement
{
    public class GuardAplicationService
    {
        private readonly GetGuardByIdUseCase _getGuardByIdUseCase;
        private readonly GetGuardsUseCase _getGuardsUseCase;
        private readonly CreateGuardUseCase _createGuardUseCase;
        private readonly UpdateGuardUseCase _updateGuardUseCase;
        private readonly EndGuardUseCase _endGuardUseCase;
        private readonly GetGuardsByVoluntareeIdUseCase _getGuardsByVoluntareeIdUseCase;
        public GuardAplicationService(GetGuardByIdUseCase getGuardByIdUseCase, GetGuardsUseCase getGuardsUseCase, CreateGuardUseCase createGuardUseCase, UpdateGuardUseCase updateGuardUseCase, EndGuardUseCase endGuardUseCase, GetGuardsByVoluntareeIdUseCase getGuardsByVoluntareeIdUseCase)
        {
            _getGuardByIdUseCase = getGuardByIdUseCase;
            _getGuardsUseCase = getGuardsUseCase;
            _createGuardUseCase = createGuardUseCase;
            _updateGuardUseCase = updateGuardUseCase;
            _endGuardUseCase = endGuardUseCase;
            _getGuardsByVoluntareeIdUseCase = getGuardsByVoluntareeIdUseCase;
        }

        public async Task<GuardDTO> GetGuardByIdAync(int id)
            => await _getGuardByIdUseCase.Execute(id);

        public async Task<(IEnumerable<GuardDTO>, int totalPages)> GetGuardsAsync(string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
            => await _getGuardsUseCase.Execute(query, status, shift, startDate, endDate, page, limit);

        public async Task CreateGuardAsync(CreateGuardDTO dto, short userId, string userName)
            => await _createGuardUseCase.Execute(dto, userId, userName);

        public async Task UpdateGuardAsync(UpdateGuardDTO dto, short userId, string userName)
            => await _updateGuardUseCase.Execute(dto, userId, userName);

        public async Task EndGuardAsync(EndGuardDTO dto, short userId, string userName)
            => await _endGuardUseCase.Execute(dto, userId, userName);

        public async Task<(IEnumerable<ReportGuardDTO>, int totalPages)> GetGuardsByVoluntareeIdAsync(int id, string? query, byte? status, int? shift, DateOnly? startDate, DateOnly? endDate, int? page, int? limit)
            => await _getGuardsByVoluntareeIdUseCase.Execute(id, query, status, shift, startDate, endDate, page, limit);
    }
}
