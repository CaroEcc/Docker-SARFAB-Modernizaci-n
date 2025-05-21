using Modernization_SARFAB_Backend.Application.DTOs.Medical;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Medical;

namespace Modernization_SARFAB_Backend.Application.UseCases.Medical
{
    public class GetMedicalTreatmentByIdUseCase
    {
        private readonly IMedicalTreatmentRepository _repositoty;

        public GetMedicalTreatmentByIdUseCase(IMedicalTreatmentRepository repositoty)
        {
            _repositoty = repositoty;
        }

        public async Task<MedicalTreatmentDTO> ExecuteAsync(int id)
        {
            var medicalTreatment = await _repositoty.GetMedicalTreatmentByIdAsync(id);

            var medicalTreatmentDTO = new MedicalTreatmentDTO
            {
                MedicalTreatmentId = medicalTreatment.Id,
                TreatmentDate = medicalTreatment.TreatmentDate,
                Diagnosis = medicalTreatment.Diagnosis,
                Description = medicalTreatment.Description,
                AttendingPersonId = medicalTreatment.AttendingPersonId,
                AttendingPersonFullname = $"{medicalTreatment.AttenndingPerson.FirstName} {medicalTreatment.AttenndingPerson.LastName}",
                PatientPersonId = medicalTreatment.PatientPersonId,
                PatientPersonFullname = $"{medicalTreatment.PatientPerson.FirstName} {medicalTreatment.PatientPerson.LastName}",
            };

            return medicalTreatmentDTO;
        }
    }
}
