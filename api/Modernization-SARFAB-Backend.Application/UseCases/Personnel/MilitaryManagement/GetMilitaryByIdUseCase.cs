using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class GetMilitaryByIdUseCase
    {
        private readonly IMilitaryRepository _repository;

        public GetMilitaryByIdUseCase(
            IMilitaryRepository repository)
        {
            _repository = repository;
        }

        public async Task<MilitaryDTO> GetByIdAsync(int id)
        {
            var (military, rankName) = await _repository.GetMilitaryByIdAsync(id);
            return new MilitaryDTO
            {
                Id = military.Id,
                FirstName = military.Person.FirstName,
                LastName = military.Person.LastName,
                MobilePhone = military.MobilePhone,
                RankName = rankName
            };
        }

    }
}
