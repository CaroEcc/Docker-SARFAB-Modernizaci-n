using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class RecruitmentEntity
    {
        public int RecruitmentId { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Ci { get; private set; }
        public DateOnly BirthDate { get; private set; }
        public bool WantsMilitaryService { get; private set; }
        public RecruitmentStatus Status { get; private set; }
        public short? UserId { get; private set; }
        public RecruitmentEntity(string firstName, string lastName, string ci,
            DateOnly birthDate, bool wantsMilitaryService, short? userId = 0)
        {
            FirstName = firstName;
            LastName = lastName;
            Ci = ci;
            BirthDate = birthDate;
            WantsMilitaryService = wantsMilitaryService;
            Status = RecruitmentStatus.InProcess;
            UserId = userId;

            if (!IsAdult())
            {
                throw new DomainException("Debe ser mayor de edad");
            }
        }
        public RecruitmentEntity(int recruitmentId, string firstName, string lastName, string ci,
         DateOnly birthDate, bool wantsMilitaryService, short? userId, RecruitmentStatus status)
        {
            RecruitmentId = recruitmentId;
            FirstName = firstName;
            LastName = lastName;
            Ci = ci;
            BirthDate = birthDate;
            WantsMilitaryService = wantsMilitaryService;
            UserId = userId;
            Status = status;
        }
        public enum RecruitmentStatus
        {
            NotQualified = 0,    // No apto
            InProcess = 1,       // En proceso
            Qualified = 2,       // Apto - pendiente de registro
            Registered = 3 // Apto - Registrado como voluntario
        }
        public bool IsAdult()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var age = today.Year - BirthDate.Year;
            return age > 18 || (age == 18 && today.DayOfYear >= BirthDate.DayOfYear);
        }
        public string GetServiceType() =>
            WantsMilitaryService ? "Libretista" : "Voluntario";
        public void Qualify() => Status = RecruitmentStatus.Qualified;
        public void Disqualify() => Status = RecruitmentStatus.NotQualified;
        public void Register() => Status = RecruitmentStatus.Registered;
        public void UpdateDetails(string? firstName, string? lastName, string? ci, DateOnly? birthDate, bool? wantsMilitaryService)
        {
            if (!string.IsNullOrEmpty(firstName))
                FirstName = firstName;
            if (!string.IsNullOrEmpty(lastName))
                LastName = lastName;
            if (!string.IsNullOrEmpty(ci))
                Ci = ci;
            if (birthDate.HasValue)
                BirthDate = birthDate.Value;
            if (wantsMilitaryService.HasValue)
                WantsMilitaryService = wantsMilitaryService.Value;
            if (!IsAdult())
                throw new DomainException("Debe ser mayor de edad");
        }
    }
}
