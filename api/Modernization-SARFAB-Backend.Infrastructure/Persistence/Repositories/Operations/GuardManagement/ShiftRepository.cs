using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations.GuardManagement;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations.GuardManagement
{
    public class ShiftRepository : IShiftRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly IMapper _mapper;

        public ShiftRepository(SARFABSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ShiftDTO>> GetShiftsAsync()
        {
            var result = await _context.Shifts
                    .ProjectTo<ShiftDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync();

            return result;
        }
    }
}
