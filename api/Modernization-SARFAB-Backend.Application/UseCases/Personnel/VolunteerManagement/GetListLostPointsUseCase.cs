using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

public class GetListLostPointsUseCase
{
    private readonly IDemeritPointRepository _repository;
    private readonly IMapper _mapper;
    
    public GetListLostPointsUseCase(IDemeritPointRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<ListLostPointsDTO>> ExecuteAsync(int volunteerId)
    {
        var demeritPoints = await _repository.GetListLostPoints(volunteerId);
        return _mapper.Map<IEnumerable<ListLostPointsDTO>>(demeritPoints);
    }
    
}