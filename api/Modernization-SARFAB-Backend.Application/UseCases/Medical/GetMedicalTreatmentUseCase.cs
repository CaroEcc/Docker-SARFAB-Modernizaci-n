using Modernization_SARFAB_Backend.Application.DTOs.Medical;
using Modernization_SARFAB_Backend.Application.Interfaces.Medical;

namespace Modernization_SARFAB_Backend.Application.UseCases.Medical
{
    public class GetMedicalTreatmentUseCase
    {
        private readonly IMedicalTreatmentRepository _repositoty;

        public GetMedicalTreatmentUseCase(IMedicalTreatmentRepository repositoty)
        {
            _repositoty = repositoty;
        }

        public async Task<(IEnumerable<MedicalTreatmentDTO>, int totalPages)> ExecuteAsync(string? query, DateTime? startDate, DateTime? endDate, int? limit, int? page)
        {
            var (medicalTreatments, totalPages ) = await _repositoty.GetMedicalTreatmentsAsync(query, startDate, endDate, limit, page);

            var medicalTreatmentsDTO = medicalTreatments.Select(m =>
            {
                var medicalTreatmentDTO = new MedicalTreatmentDTO
                {
                    MedicalTreatmentId = m.Id,
                    TreatmentDate = m.TreatmentDate,
                    Diagnosis = m.Diagnosis,
                    Description = m.Description,
                    AttendingPersonId = m.AttendingPersonId,
                    AttendingPersonFullname = $"{m.AttenndingPerson.FirstName} {m.AttenndingPerson.LastName}",
                    PatientPersonId = m.PatientPersonId,
                    PatientPersonFullname = $"{m.PatientPerson.FirstName} {m.PatientPerson.LastName}",
                };
                return medicalTreatmentDTO;
            });

            return (medicalTreatmentsDTO, totalPages);
        }
    }
}
