using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations;

public class RequesterRepository : IRequesterRepository
{
    private readonly SARFABSystemDbContext _context;

    public RequesterRepository(SARFABSystemDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<RequesterDTO> Data, int TotalPages)> GetRequestersAsync(string searchTerm = null, int page = 1, int pageSize = 10)
    {
        var query = _context.Requesters.Where(r => r.Status == 1);

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(r => r.Name.Contains(searchTerm));
        }

        var totalRecords = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

        var requesters = await query
            .OrderBy(r => r.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new RequesterDTO
            {
                RequesterId = r.RequesterId,
                Name = r.Name,
                Phone = r.Phone,
                MobilePhone = r.MobilePhone
            })
            .ToListAsync();

        return (requesters, totalPages);
    }
}
