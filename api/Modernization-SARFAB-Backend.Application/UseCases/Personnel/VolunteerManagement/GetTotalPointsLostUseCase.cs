using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetTotalPointsLostUseCase
    {
        private readonly IDemeritPointRepository _demeritPointRepository;
        public GetTotalPointsLostUseCase(IDemeritPointRepository demeritPointRepository)
        {
            _demeritPointRepository = demeritPointRepository;
        }

        public async Task<TotalPointsLostDTO> ExecuteAsync(int volunteerId)
        {
            var totalPointsLost = await _demeritPointRepository.GetTotalPointsLost(volunteerId);
            return new TotalPointsLostDTO
            {
                TotalPointsLost = totalPointsLost
            };
        }
    }
}
