using Modernization_SARFAB_Backend.Application.Interfaces.Notifications;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Notifications;

namespace Modernization_SARFAB_Backend.Application.UseCases.Notifications;
public class VerifyDemeritPointsUseCase
{
    private readonly IDemeritPointRepository _demeritPointRepository;
    private readonly IVolunteerRepository _volunteerRepository;
    private readonly INotificationRepository _notificationRepository;

    public VerifyDemeritPointsUseCase(
        IDemeritPointRepository demeritPointRepository,
        IVolunteerRepository volunteerRepository,
        INotificationRepository notificationRepository)
    {
        _demeritPointRepository = demeritPointRepository;
        _volunteerRepository = volunteerRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task ExecuteAsync()
    {
        var puntosPorVoluntario = await _demeritPointRepository.GetTotalPointsLostForAllVolunteersAsync();

        foreach (var (volunteerId, totalPoints) in puntosPorVoluntario)
        {
            var volunteerType = await _volunteerRepository.GetVolunteerTypeByIdAsync(volunteerId);
            var personalInfo = await _volunteerRepository.GetFullNameAndGradeByIdAsync(volunteerId);

            if (string.IsNullOrWhiteSpace(volunteerType) || personalInfo is null)
                continue;

            var fullName = personalInfo.Value.FullName;
            var grade = personalInfo.Value.GradeName;
            
            int limit = volunteerType.ToLower() switch
            {
                "libretista" => 8,
                "voluntario" => 10,
                _ => int.MaxValue
            };

            if (totalPoints >= limit)
            {
                bool exists = await _notificationRepository.ExistsSimilarNotificationAsync(
                    volunteerId: volunteerId,
                    type: "Demerit",
                    relatedEntityId: null,
                    daysBeforeExpiration: null
                );

                if (!exists)
                {
                    string rolePrefix = volunteerType.ToLower() switch
                    {
                        "libretista" => "Libretista",
                        "voluntario" => "Voluntario",
                        _ => "El miembro"
                    };

                    var message = $"{fullName} ({grade}, {rolePrefix}) ha superado el límite de puntos perdidos ({totalPoints} puntos) por inasistencia.";

                    var notification = new NotificationEntity(
                        volunteerId: volunteerId,
                        message: message,
                        type: "Demerit"
                    );

                    await _notificationRepository.AddAsync(notification);
                }
            }
        }

        await _notificationRepository.SaveChangesAsync();
    }
}