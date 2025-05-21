using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class DemeritPointEntity
    {
        public int DemeritId { get; private set; }
        public int VolunteerId { get; private set; }
        public int PointsLost { get; private set; }
        public string Reason { get; private set; }
        public DateOnly Date { get; private set; }
        public string? Observation { get; private set; }
        public short? UserId { get; private set; }

        public DemeritPointEntity(int volunteerId, int pointsLost, string reason, DateOnly date, string? observation, short? userId = null)
        {
            if (string.IsNullOrWhiteSpace(reason))
                throw new DomainException("La razón no puede estar vacía.");
            if (pointsLost <= 0)
                throw new DomainException("Los puntos perdidos deben ser mayores a 0.");

            VolunteerId = volunteerId;
            PointsLost = pointsLost;
            Reason = reason;
            Date = date;
            Observation = observation;
            UserId = userId;
        }

        public void UpdateDetails(int? newPointsLost, string? newReason, DateOnly? newDate, string? newObservation)
        {
            if (newReason is not null && string.IsNullOrWhiteSpace(newReason))
                throw new DomainException("La razón no puede estar vacía.");
            if (newPointsLost.HasValue && newPointsLost.Value <= 0)
                throw new DomainException("Los puntos perdidos deben ser mayores a 0.");

            if (newPointsLost.HasValue)
                PointsLost = newPointsLost.Value;

            if (newReason is not null)
                Reason = newReason;

            if (newDate.HasValue)
                Date = newDate.Value;

            if (newObservation is not null)
                Observation = newObservation;
        }
    }
}
