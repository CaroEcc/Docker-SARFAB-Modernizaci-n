using Modernization_SARFAB_Backend.Application.Interfaces.Notifications;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Notifications;

namespace Modernization_SARFAB_Backend.Application.UseCases.Notifications;

public class VerifyMedicalCheckupsUseCase
    {
        private readonly IMedicalCheckupRepository _medicalCheckupRepository;
        private readonly IVolunteerRepository _volunteerRepository;
        private readonly INotificationRepository _notificationRepository;

        public VerifyMedicalCheckupsUseCase(
            IMedicalCheckupRepository medicalCheckupRepository,
            IVolunteerRepository volunteerRepository,
            INotificationRepository notificationRepository)
        {
            _medicalCheckupRepository = medicalCheckupRepository;
            _volunteerRepository = volunteerRepository;
            _notificationRepository = notificationRepository;
        }

        public async Task ExecuteAsync()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var daysBeforeList = new[] { 7, 5, 3 };

            foreach (var daysBefore in daysBeforeList)
            {
                var targetDate = today.AddDays(daysBefore);
                var expiringCheckups = await _medicalCheckupRepository.GetExpiringCheckupsAsync(targetDate);

                foreach (var checkup in expiringCheckups)
                {
                    var volunteerInfo = await _volunteerRepository.GetFullNameAndGradeByIdAsync(checkup.VolunteerId);
                    if (volunteerInfo is null)
                        continue;

                    var fullName = volunteerInfo.Value.FullName;
                    var grade = volunteerInfo.Value.GradeName;

                    bool alreadyExists = await _notificationRepository.ExistsSimilarNotificationAsync(
                        volunteerId: checkup.VolunteerId,
                        type: "MedicalCheckup",
                        relatedEntityId: checkup.CheckupId,
                        daysBeforeExpiration: daysBefore
                    );

                    if (!alreadyExists)
                    {
                        var message = $"El chequeo médico vigente de {fullName} ({grade}) vence en {daysBefore} día(s).";
                        var notification = new NotificationEntity(
                            volunteerId: checkup.VolunteerId,
                            message: message,
                            type: "MedicalCheckup",
                            relatedEntityId: checkup.CheckupId,
                            daysBeforeExpiration: daysBefore
                        );

                        await _notificationRepository.AddAsync(notification);
                    }
                }
            }
            
            var expiredCheckups = await _medicalCheckupRepository.GetExpiredCheckupsWithoutRenewalAsync(today);

            foreach (var checkup in expiredCheckups)
            {
                var volunteerInfo = await _volunteerRepository.GetFullNameAndGradeByIdAsync(checkup.VolunteerId);
                if (volunteerInfo is null)
                    continue;

                var fullName = volunteerInfo.Value.FullName;
                var grade = volunteerInfo.Value.GradeName;

                bool alreadyExists = await _notificationRepository.ExistsSimilarNotificationAsync(
                    volunteerId: checkup.VolunteerId,
                    type: "MedicalCheckupExpired",
                    relatedEntityId: checkup.CheckupId,
                    daysBeforeExpiration: null
                );

                if (!alreadyExists)
                {
                    var message = $"El chequeo médico de {fullName} ({grade}) ha vencido y aún no ha sido renovado.";
                    var notification = new NotificationEntity(
                        volunteerId: checkup.VolunteerId,
                        message: message,
                        type: "MedicalCheckupExpired",
                        relatedEntityId: checkup.CheckupId
                    );

                    await _notificationRepository.AddAsync(notification);
                }
            }

            await _notificationRepository.SaveChangesAsync();
        }
    }