using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class GetAllRecruitmentUseCase
    {
        private readonly IRecruitmentRepository _repository;

        public GetAllRecruitmentUseCase(IRecruitmentRepository repository)
        {
            _repository = repository;
        }
        public async Task<(IEnumerable<RecruitmentDTO> Data, int TotalPages)> ExecuteAsync(
            string searchTerm = null,
            RecruitmentEntity.RecruitmentStatus? status = RecruitmentEntity.RecruitmentStatus.InProcess,
            int page = 1,
            int pageSize = 10)
        {
            try
            {
                var (entities, totalPages) = await _repository.GetRecruitmentsAsync(searchTerm, status, page, pageSize);

                var recruitmentDTOs = entities.Select(entity => new RecruitmentDTO
                {
                    RecruitmentId = entity.RecruitmentId,
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    Ci = entity.Ci,
                    BirthDate = entity.BirthDate,
                    WantsMilitaryService = entity.WantsMilitaryService,
                    Status = entity.Status
                });

                return (recruitmentDTOs, totalPages);
            }
            catch (Exception)
            {
                throw new BusinessException("Error al obtener la lista de reclutamientos");
            }
        }
    }
}