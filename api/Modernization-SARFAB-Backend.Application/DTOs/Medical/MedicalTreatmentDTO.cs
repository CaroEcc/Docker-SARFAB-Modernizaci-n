namespace Modernization_SARFAB_Backend.Application.DTOs.Medical
{
    public class MedicalTreatmentDTO
    {
        public int MedicalTreatmentId { get; set; }
        public DateTime TreatmentDate { get; set; }
        public string Diagnosis { get; set; }
        public string Description { get; set; }
        public int AttendingPersonId { get; set; }
        public string AttendingPersonFullname { get; set; }
        public int PatientPersonId { get; set; }
        public string PatientPersonFullname { get; set; }
    }
}
