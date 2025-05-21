using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class MedicalCheckupApplicationService
    {
        private readonly VolunteerMedicalChecklistUseCase _volunteerMedicalChecklistUseCase;
        private readonly GetMedicalCheckById _getMedicalCheckById;
        private readonly CreateMedicalCheckupUseCase _createMedicalCheckupUseCase;
        private readonly UpdateMedicalCheckupUseCase _updateMedicalCheckupUseCase;
        public MedicalCheckupApplicationService(VolunteerMedicalChecklistUseCase volunteerMedicalChecklistUseCase, 
            GetMedicalCheckById getMedicalCheckById, 
            CreateMedicalCheckupUseCase createMedicalCheckupUseCase, 
            UpdateMedicalCheckupUseCase updateMedicalCheckupUseCase)
        {
            _volunteerMedicalChecklistUseCase = volunteerMedicalChecklistUseCase;
            _getMedicalCheckById = getMedicalCheckById;
            _createMedicalCheckupUseCase = createMedicalCheckupUseCase;
            _updateMedicalCheckupUseCase = updateMedicalCheckupUseCase;
        }
        public async Task<IEnumerable<VolunteerMedicalCheckDTO>> GetMedicalCheckupsAsync(int volunteerId) => await _volunteerMedicalChecklistUseCase.ExecuteAsync(volunteerId);

        public async Task<VolunteerMedicalCheckDTO> GetVolunteerMedicalCheckAsync(int id) => await _getMedicalCheckById.ExecuteAsync(id);

        public async Task CreateMedicalCheckupAsync(CreateMedicalCheckupDTO dto, short userId, string userName) => await _createMedicalCheckupUseCase.ExecuteAsync(dto, userId, userName);

        public async Task UpdateMedicalCheckupAsync(UpdateMedicalCheckupDTO dto, int id, string userName) => await _updateMedicalCheckupUseCase.ExecuteAsync(dto, id, userName);


    }
}
