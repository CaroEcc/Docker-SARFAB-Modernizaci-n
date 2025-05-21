using Modernization_SARFAB_Backend.Application.UseCases.Notifications;

namespace Modernization_SARFAB_Backend.Application.Services.Notifications;

public class NotificationApplicationService
{
    private readonly VerifyDemeritPointsUseCase _verifyDemeritPointsUseCase;
    private readonly VerifyMedicalCheckupsUseCase _verifyMedicalCheckupsUseCase;

    public NotificationApplicationService(
        VerifyDemeritPointsUseCase verifyDemeritPointsUseCase,
        VerifyMedicalCheckupsUseCase verifyMedicalCheckupsUseCase)
    {
        _verifyDemeritPointsUseCase = verifyDemeritPointsUseCase;
        _verifyMedicalCheckupsUseCase = verifyMedicalCheckupsUseCase;
    }

    public async Task VerifyAllAsync()
    {
        await _verifyDemeritPointsUseCase.ExecuteAsync();
        await _verifyMedicalCheckupsUseCase.ExecuteAsync();
    }
}