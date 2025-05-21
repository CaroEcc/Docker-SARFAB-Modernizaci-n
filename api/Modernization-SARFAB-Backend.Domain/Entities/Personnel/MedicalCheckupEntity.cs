using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class MedicalCheckupEntity
    {
        public int CheckupId { get; private set; }
        public int VolunteerId { get; private set; }
        public DateOnly CheckupDate { get; private set; }
        public DateOnly ExpirationDate { get; private set; }
        public string? Observations { get; private set; }
        public short? UserId { get; private set; }

        public MedicalCheckupEntity(int volunteerId, DateOnly checkupDate, DateOnly expirationDate, string? observations, short userId = 0)
        {
            if (expirationDate <= checkupDate)
                throw new DomainException("La fecha de expiración debe ser posterior a la fecha de chequeo.");
            VolunteerId = volunteerId;
            CheckupDate = checkupDate;
            ExpirationDate = expirationDate;
            Observations = observations;
            UserId = userId;
        }

        public MedicalCheckupEntity(int checkupId, int volunteerId, DateOnly checkupDate, DateOnly expirationDate, string? observations, short? userId)
        {
            CheckupId = checkupId;
            VolunteerId = volunteerId;
            CheckupDate = checkupDate;
            ExpirationDate = expirationDate;
            Observations = observations;
            UserId = userId;
        }
        
        public void UpdateDetails(DateOnly? newCheckupDate, DateOnly? newExpirationDate, string? newObservations)
        {
            if (newCheckupDate.HasValue || newExpirationDate.HasValue)
            {
                var effectiveCheckupDate = newCheckupDate ?? CheckupDate;
                var effectiveExpirationDate = newExpirationDate ?? ExpirationDate;

                if (effectiveExpirationDate <= effectiveCheckupDate)
                    throw new DomainException("La fecha de expiración debe ser posterior a la fecha de chequeo.");
            }

            if (newCheckupDate.HasValue)
                CheckupDate = newCheckupDate.Value;

            if (newExpirationDate.HasValue)
                ExpirationDate = newExpirationDate.Value;

            if (newObservations is not null)
                Observations = newObservations;
        }
    }
}
