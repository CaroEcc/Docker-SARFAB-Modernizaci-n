using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Common;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations;

public class OperationCategoryRepository : IOperationCategoryRepository
{
    private readonly SARFABSystemDbContext _context;

    public OperationCategoryRepository(SARFABSystemDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(CreateOperationCategoryDTO dto)
    {
        var category = new OperationCategory
        {
            Name = dto.Name
        };

        _context.OperationCategories.Add(category);
        await _context.SaveChangesAsync();
    }
    
    public async Task UpdateAsync(int operationCategoryId, UpdateOperationCategoryDTO dto)
    {
        var entity = await _context.OperationCategories
            .FirstOrDefaultAsync(o => o.OperationCategoryId == operationCategoryId);

        if (entity == null)
            throw new KeyNotFoundException("La categoría de operación no existe.");

        entity.Name = dto.Name;

        await _context.SaveChangesAsync();
    }
    
    public async Task<PagedResult<OperationCategoryWithTypesDTO>> GetCategoriesWithTypesAsync(
        string? searchTerm, int page, int pageSize)
    {
        var query = _context.OperationCategories
            .Include(c => c.OperationTypes)
            .AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(c => c.Name.Contains(searchTerm) ||
                                     c.OperationTypes.Any(o => o.Name.Contains(searchTerm)));
        }

        var totalRecords = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

        var categories = await query
            .OrderBy(c => c.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new OperationCategoryWithTypesDTO()
            {
                CategoryId = c.OperationCategoryId,
                CategoryName = c.Name,
                Operations = c.OperationTypes
                    .Where(o => string.IsNullOrEmpty(searchTerm) || o.Name.Contains(searchTerm))
                    .Select(o => new OperationTypeDTO
                    {
                        OperationTypeId = o.OperationTypeId,
                        Name = o.Name
                    }).ToList()
            })
            .ToListAsync();

        return new PagedResult<OperationCategoryWithTypesDTO> { Data = categories, TotalPages = totalPages };
    }
}
