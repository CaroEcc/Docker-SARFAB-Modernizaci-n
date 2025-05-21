using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement
{
    public class GetShiftUseCase
    {
        private readonly IShiftRepository _repository;

        public GetShiftUseCase(IShiftRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ShiftDTO>> Execute()
        {
            var result = await _repository.GetShiftsAsync();
            return result;
        } 
    }
}
