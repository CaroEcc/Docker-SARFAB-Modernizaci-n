using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

public class CreateDemeritPointUseCase
{
    private readonly IDemeritPointRepository _repository;
    
    public CreateDemeritPointUseCase(IDemeritPointRepository repository)
    {
        _repository = repository;
    }
    
    public async Task ExecuteAsync(CreateDemeritPointDTO dto, short userId)
    {
        var demeritPoint = new DemeritPointEntity(
            dto.VolunteerId,
            2,
            dto.Reason,
            dto.Date,
            dto.Observation,
            userId
        );

        await _repository.CreateDemeritPointAsync(demeritPoint);
    }
}