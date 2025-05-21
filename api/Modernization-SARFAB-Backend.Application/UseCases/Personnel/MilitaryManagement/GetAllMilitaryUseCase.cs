using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class GetAllMilitaryUseCase
    {
        private readonly IMilitaryRepository _repository;

        public GetAllMilitaryUseCase(IMilitaryRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<MilitaryDTO> Data, int TotalPages)> ExecuteAsync(
            string searchTerm = null,
            MilitaryEntity.MilitaryStatus? status = MilitaryEntity.MilitaryStatus.Active,
            int? rankId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10)
        {
            var militaryWithRanks = await _repository.GetActiveMilitaryAsync(searchTerm, status, rankId, orderByLastNameAsc, page, pageSize);

            var militaryDTOs = militaryWithRanks.Data.Select(mr => new MilitaryDTO
            {
                Id = mr.Military.Id,
                FirstName = mr.Military.Person.FirstName,
                LastName = mr.Military.Person.LastName,
                MobilePhone = mr.Military.MobilePhone,
                RankName = mr.RankName,
                Status = (int)mr.Military.Status,
                CanPromote = CanPromote(mr.RankName)
            });

            return (militaryDTOs, militaryWithRanks.TotalPages);
        }
        
        private bool CanPromote(string rankName)
        {
            return rankName != "Coronel" && rankName != "Suboficial Maestro";
        }
    }
}