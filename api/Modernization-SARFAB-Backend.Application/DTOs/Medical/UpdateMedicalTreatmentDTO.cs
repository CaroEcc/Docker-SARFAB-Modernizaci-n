using System.ComponentModel.DataAnnotations;

namespace Modernization_SARFAB_Backend.Application.DTOs.Medical
{
    public class UpdateMedicalTreatmentDTO
    {
        [Required]
        public int TreatmentID { get; set; }

        [Required(ErrorMessage = "La fecha es requerido")]
        public DateTime TreatmentDate { get; set; }

        [Required(ErrorMessage = "El diagnostico es requerido")]
        [StringLength(500, ErrorMessage = "El diagnostico no puede tener más de 500 caracteres")]
        public string Diagnosis { get; set; }

        [Required(ErrorMessage = "La descripción es requerida")]
        [StringLength(500, ErrorMessage = "La descripción no puede tener más de 500 caracteres")]
        public string TreatmentDescription { get; set; }

        public int AttendingPersonID { get; set; }
        public int PatientPersonID { get; set; }
    }
}
