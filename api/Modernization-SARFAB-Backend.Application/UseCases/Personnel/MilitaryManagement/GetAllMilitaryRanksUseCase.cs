using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class GetAllMilitaryRanksUseCase
    {
        private readonly IMilitaryRepository _repository;

        public GetAllMilitaryRanksUseCase(IMilitaryRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RankGradeDTO>> ExecuteAsync()
        {
            return await _repository.GetAllRanksAsync();
        }
    }
}