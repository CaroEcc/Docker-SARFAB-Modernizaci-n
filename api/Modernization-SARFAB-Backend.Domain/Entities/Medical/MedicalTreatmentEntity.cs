using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using System;

namespace Modernization_SARFAB_Backend.Domain.Entities.Medical
{
    public class MedicalTreatmentEntity
    {
        public int Id { get; private set; }
        public DateTime TreatmentDate { get; private set; }
        public string Diagnosis { get; private set; }
        public string Description { get; private set; }
        public int AttendingPersonId { get; private set; }
        public PersonEntity AttenndingPerson{ get; set; }
        public int PatientPersonId { get; private set; }
        public PersonEntity PatientPerson { get; set; }
        public short? UserId { get; private set; }
        public TreatmentStatus Status { get; private set; }

        public MedicalTreatmentEntity(int id, DateTime treatmentDate, string diagnosis, string description, PersonEntity attenndingPerson, PersonEntity patientPerson)
        {
            Id = id;
            TreatmentDate = treatmentDate;
            Diagnosis = diagnosis;
            Description = description;
            AttendingPersonId = attenndingPerson.Id;
            AttenndingPerson = attenndingPerson;
            PatientPersonId = patientPerson.Id;
            PatientPerson = patientPerson;
        }

        public MedicalTreatmentEntity(DateTime treatmentDate, string diagnosis, string description,
            int attendingPersonId, int patientPersonId, short? userId = 0)
        {
            TreatmentDate = treatmentDate;
            Diagnosis = diagnosis ?? throw new ArgumentNullException(nameof(diagnosis));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            AttendingPersonId = attendingPersonId;
            PatientPersonId = patientPersonId;
            UserId = userId;
            Status = TreatmentStatus.Active;
        }

        public MedicalTreatmentEntity(int id, DateTime treatmentDate, string diagnosis, string description,
            int attendingPersonId, int patientPersonId, short? userId = 0)
        {
            Id = id;
            TreatmentDate = treatmentDate;
            Diagnosis = diagnosis ?? throw new ArgumentNullException(nameof(diagnosis));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            AttendingPersonId = attendingPersonId;
            PatientPersonId = patientPersonId;
            UserId = userId;
            Status = TreatmentStatus.Active;
        }

        public enum TreatmentStatus
        {
            Active = 1,
            Inactive = 0
        }
    }
}
