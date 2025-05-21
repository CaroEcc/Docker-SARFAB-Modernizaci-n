using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel;

public class MilitaryApplicationService
{
    private readonly CreateMilitaryUseCase _createUseCase;
    private readonly GetAllMilitaryUseCase _getAllMilitaryUseCase;
    private readonly UpdateMilitaryUseCase _updateMilitaryUseCase;
    private readonly GetMilitaryByIdUseCase _getMilitaryUseCase;
    private readonly UpdateMilitaryStatusUseCase _updateMilitaryStatusUseCase;
    private readonly GetAllMilitaryRanksUseCase _getAllMilitaryRanksUseCase;

    public MilitaryApplicationService(
        CreateMilitaryUseCase createUseCase,
        GetAllMilitaryUseCase getAllMilitaryUseCase,
        UpdateMilitaryUseCase updateMilitaryUseCase,
        GetMilitaryByIdUseCase getMilitaryByIdUseCase, 
        UpdateMilitaryStatusUseCase updateMilitaryStatusUseCase,
        GetAllMilitaryRanksUseCase getAllMilitaryRanksUseCase)
    {
        _createUseCase = createUseCase;
        _getAllMilitaryUseCase = getAllMilitaryUseCase;
        _updateMilitaryUseCase = updateMilitaryUseCase;
        _getMilitaryUseCase = getMilitaryByIdUseCase;
        _updateMilitaryStatusUseCase = updateMilitaryStatusUseCase;
        _getAllMilitaryRanksUseCase = getAllMilitaryRanksUseCase;
    }

    public async Task<(IEnumerable<MilitaryDTO> Data, int TotalPages)> GetAllAsync(
        string searchTerm = null,
        MilitaryEntity.MilitaryStatus? status = MilitaryEntity.MilitaryStatus.Active,
        int? rankId = null,
        bool orderByLastNameAsc = true,
        int page = 1,
        int pageSize = 10) =>
        await _getAllMilitaryUseCase.ExecuteAsync(searchTerm, status, rankId, orderByLastNameAsc, page, pageSize);

    public async Task<MilitaryDTO> GetByIdAsync(int id) => await _getMilitaryUseCase.GetByIdAsync(id);
     
    public async Task CreateAsync(CreateMilitaryDTO dto, short userId, string userName) =>
        await _createUseCase.ExecuteAsync(dto, userId, userName);

    public async Task UpdateAsync(int id, UpdateMilitaryDTO dto, string userName) =>
        await _updateMilitaryUseCase.ExecuteAsync(id, dto, userName);

    public async Task UpdateStatusAsync(int id, MilitaryEntity.MilitaryStatus status, string userName) =>
        await _updateMilitaryStatusUseCase.ExecuteAsync(id, status, userName);
    
    public async Task<IEnumerable<RankGradeDTO>> GetAllRanksAsync() => await _getAllMilitaryRanksUseCase.ExecuteAsync();
}
