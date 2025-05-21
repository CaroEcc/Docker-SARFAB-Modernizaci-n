using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class GetRecruitmentByIdUseCase
    {
        private readonly IRecruitmentRepository _repository;

        public GetRecruitmentByIdUseCase(
            IRecruitmentRepository repository)
        {
            _repository = repository;
        }

        public async Task<RecruitmentDTO> ExecuteAsync(int id)
        {
            var recruitment = await _repository.GetRecruitmentByIdAsync(id);
            return new RecruitmentDTO
            {
                RecruitmentId = recruitment.RecruitmentId,
                FirstName = recruitment.FirstName,
                LastName = recruitment.LastName,
                Ci = recruitment.Ci,
                BirthDate = recruitment.BirthDate,
                WantsMilitaryService = recruitment.WantsMilitaryService,
                Status = recruitment.Status
            };
        }
    }
}
