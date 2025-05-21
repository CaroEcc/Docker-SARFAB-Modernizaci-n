using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class DemeritPointApplicationService
    {
        private readonly GetTotalPointsLostUseCase _getTotalPointsLostUseCase;
        private readonly GetListLostPointsUseCase _getListLostPointsUseCase;
        private readonly CreateDemeritPointUseCase _createDemeritPointUseCase;
        private readonly DeleteDemeritPointUseCase _deleteDemeritPointUseCase;
        

        public DemeritPointApplicationService(GetTotalPointsLostUseCase getTotalPointsLostUseCase, 
            GetListLostPointsUseCase getListLostPointsUseCase, 
            CreateDemeritPointUseCase createDemeritPointUseCase,
            DeleteDemeritPointUseCase deleteDemeritPointUseCase)
        {
            _getTotalPointsLostUseCase = getTotalPointsLostUseCase;
            _getListLostPointsUseCase = getListLostPointsUseCase;
            _createDemeritPointUseCase = createDemeritPointUseCase;
            _deleteDemeritPointUseCase = deleteDemeritPointUseCase;
        }

        public async Task<TotalPointsLostDTO> GetTotalPointsLostAsync(int volunteerId)
        {
            return await _getTotalPointsLostUseCase.ExecuteAsync(volunteerId);
        }
        public async Task<IEnumerable<ListLostPointsDTO>> GetListLostPointsAsync(int volunteerId)
        {
            return await _getListLostPointsUseCase.ExecuteAsync(volunteerId);
        }
        public async Task CreateDemeritPointAsync(CreateDemeritPointDTO dto, short userId)
        {
            await _createDemeritPointUseCase.ExecuteAsync(dto, userId);
        }
        public async Task DeleteDemeritPointAsync(int id)
        {
            await _deleteDemeritPointUseCase.ExecuteAsync(id);
        }
    }
}
