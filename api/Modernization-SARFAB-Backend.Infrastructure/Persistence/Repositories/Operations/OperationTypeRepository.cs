using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationConfig;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations;

public class OperationTypeRepository : IOperationTypeRepository
{
    private readonly SARFABSystemDbContext _context;

    public OperationTypeRepository(SARFABSystemDbContext context)
    {
        _context = context;
    }

    public async Task CreateOperationTypeAsync(CreateOperationTypeDTO dto)
    {
        var entity = new OperationType
        {
            Name = dto.Name,
            OperationCategoryId = dto.OperationCategoryId
        };

        _context.OperationTypes.Add(entity);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateAsync(int operationTypeId, UpdateOperationTypeDTO dto)
    {
        var entity = await _context.OperationTypes
            .FirstOrDefaultAsync(o => o.OperationTypeId == operationTypeId);

        if (entity == null)
            throw new KeyNotFoundException("El tipo de operación no existe.");
        entity.Name = dto.Name;
        await _context.SaveChangesAsync();
    }
}
