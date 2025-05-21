using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetAllVolunteerGradesUseCase
    {
        private readonly IVolunteerRepository _repository;

        public GetAllVolunteerGradesUseCase(IVolunteerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RankGradeDTO>> ExecuteAsync()
        {
            return await _repository.GetAllGradesAsync();
        }
    }
}