using Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class MilitaryRankAssignmentApplicationService
    {
        private readonly PromoteMilitaryUseCase _promoteUseCase;

        public MilitaryRankAssignmentApplicationService(PromoteMilitaryUseCase promoteUseCase)
        {
            _promoteUseCase = promoteUseCase;
        }

        public async Task PromoteAsync(int militaryId, string userName) =>
            await _promoteUseCase.ExecuteAsync(militaryId, userName);
    }
}
