using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement
{
    public interface IShiftRepository
    {
        Task<IEnumerable<ShiftDTO>> GetShiftsAsync();
    }
}
