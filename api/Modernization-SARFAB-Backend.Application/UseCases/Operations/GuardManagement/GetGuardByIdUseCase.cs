using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{
    public class GetGuardByIdUseCase
    {
        private readonly IGuardRepository _repository;

        public GetGuardByIdUseCase(IGuardRepository repository)
        {
            _repository = repository;
        }

        public async Task<GuardDTO> Execute(int id)
        {
            var result = await _repository.GetGuardByIdAsync(id);
            return result;
        }
    }
}
