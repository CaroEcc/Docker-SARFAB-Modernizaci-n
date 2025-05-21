using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class VolunteerGradePromotionApplicationService
    {
        private readonly PromoteVolunteerUseCase _promoteUseCase;

        public VolunteerGradePromotionApplicationService(PromoteVolunteerUseCase promoteUseCase)
        {
            _promoteUseCase = promoteUseCase;
        }

        public async Task PromoteAsync(int volunteerId, string userName) =>
            await _promoteUseCase.ExecuteAsync(volunteerId, userName);
    }
}
