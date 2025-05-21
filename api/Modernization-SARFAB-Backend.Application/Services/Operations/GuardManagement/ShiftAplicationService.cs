using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.Services.Operations.GuardManagement
{
    public class ShiftAplicationService
    {
        private readonly GetShiftUseCase _getShiftUseCase;

        public ShiftAplicationService(GetShiftUseCase getShiftUseCase)
        {
            _getShiftUseCase = getShiftUseCase;
        }

        public async Task<IEnumerable<ShiftDTO>> GetShiftsAsync() 
            => await _getShiftUseCase.Execute();
    }
}
