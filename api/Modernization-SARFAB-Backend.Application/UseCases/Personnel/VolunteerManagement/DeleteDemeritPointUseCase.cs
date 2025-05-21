using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;

public class DeleteDemeritPointUseCase
{
    private readonly IDemeritPointRepository _repository;
    
    public DeleteDemeritPointUseCase(IDemeritPointRepository repository)
    {
        _repository = repository;
    }
    
    public async Task ExecuteAsync(int id)
    {
        await _repository.DeleteDemeritPointAsync(id);
    }
}