using Modernization_SARFAB_Backend.Application.DTOs.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel;

public class RecruitmentApplicationService
{
    private readonly GetAllRecruitmentUseCase _getAllUseCase;
    private readonly CreateRecruitmentUseCase _createUseCase;
    private readonly UpdateRecruitmentUseCase _updateUseCase;
    private readonly GetRecruitmentByIdUseCase _getByIdUseCase;
    private readonly UpdateRecruitmentStatusUseCase _updateStatusUseCase;

    public RecruitmentApplicationService(
        GetAllRecruitmentUseCase getAllUseCase,
        CreateRecruitmentUseCase createUseCase,
        UpdateRecruitmentUseCase updateUseCase,
        GetRecruitmentByIdUseCase getByIdUseCase,
        UpdateRecruitmentStatusUseCase updateStatusUseCase)
    {
        _getAllUseCase = getAllUseCase;
        _createUseCase = createUseCase;
        _updateUseCase = updateUseCase;
        _getByIdUseCase = getByIdUseCase;
        _updateStatusUseCase = updateStatusUseCase;
    }

    public async Task<(IEnumerable<RecruitmentDTO> Data, int TotalPages)> GetAllAsync(
        string searchTerm = null, 
        RecruitmentEntity.RecruitmentStatus? status = RecruitmentEntity.RecruitmentStatus.InProcess,
        int page = 1,
        int pageSize = 10)
    {
        return await _getAllUseCase.ExecuteAsync(searchTerm, status, page, pageSize);
    }

    public async Task<int> CreateAsync(CreateRecruitmentDTO dto, short userId, string userName) =>
        await _createUseCase.ExecuteAsync(dto, userId, userName);

    public async Task UpdateAsync(UpdateRecruitmentDTO dto, string userName) =>
        await _updateUseCase.ExecuteAsync(dto, userName);

    public async Task<RecruitmentDTO> GetByIdAsync(int id) =>
        await _getByIdUseCase.ExecuteAsync(id);

    public async Task UpdateStatusAsync(int id, RecruitmentEntity.RecruitmentStatus status, string userName) =>
        await _updateStatusUseCase.ExecuteAsync(id, status, userName);
}
