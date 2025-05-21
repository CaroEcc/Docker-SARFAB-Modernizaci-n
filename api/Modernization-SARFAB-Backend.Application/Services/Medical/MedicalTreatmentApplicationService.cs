using Modernization_SARFAB_Backend.Application.DTOs.Medical;
using Modernization_SARFAB_Backend.Application.UseCases.Medical;

namespace Modernization_SARFAB_Backend.Application.Services.Medical
{
    public class MedicalTreatmentApplicationService
    {
        private readonly CreateMedicalTreatmentUseCase _createMedicalTreatmentUseCase;
        private readonly UpdateMedicalTreatmentUseCase _updateMedicalTreatmentUseCase;
        private readonly GetMedicalTreatmentByIdUseCase _getMedicalTreatmentByIdUseCase;
        private readonly GetMedicalTreatmentUseCase _getMedicalTreatmentUseCase;

        public MedicalTreatmentApplicationService(CreateMedicalTreatmentUseCase createMedicalTreatmentUseCase, UpdateMedicalTreatmentUseCase updateMedicalTreatmentUseCase,
            GetMedicalTreatmentByIdUseCase getMedicalTreatmentByIdUseCase, GetMedicalTreatmentUseCase getMedicalTreatmentUseCase)
        {
            _createMedicalTreatmentUseCase = createMedicalTreatmentUseCase;
            _updateMedicalTreatmentUseCase = updateMedicalTreatmentUseCase;
            _getMedicalTreatmentByIdUseCase = getMedicalTreatmentByIdUseCase;
            _getMedicalTreatmentUseCase = getMedicalTreatmentUseCase;
        }

        public async Task CreateMedicalTreatmentAsync(CreateMedicalTreatmentDTO request, short userId, string userName)
            => await _createMedicalTreatmentUseCase.ExecuteAsync(request, userId, userName);

        public async Task<(IEnumerable<MedicalTreatmentDTO>, int totalPages)> GetMedicalTreatmentsAsync(string? query, DateTime? startDate, DateTime? endDate, int? limit, int? page) 
            => await _getMedicalTreatmentUseCase.ExecuteAsync(query, startDate, endDate, limit, page);

        public async Task<MedicalTreatmentDTO> GetMedicalTreatmentByIdAsync(int id)  
            => await _getMedicalTreatmentByIdUseCase.ExecuteAsync(id);

        public async Task UpdateMedicalTreatmentAsync(UpdateMedicalTreatmentDTO request, short userId, string userName)
            => await _updateMedicalTreatmentUseCase.ExecuteAsync(request, userId, userName);
    }
}
