using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly SARFABSystemDbContext _context;
    private IDbContextTransaction _transaction;

    public UnitOfWork(SARFABSystemDbContext context)
    {
        _context = context;
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        await _transaction.CommitAsync();
    }

    public async Task RollbackAsync()
    {
        await _transaction.RollbackAsync();
    }

    public void Dispose()
    {
        _transaction?.Dispose();
    }
    public async Task ExecuteWithStrategyAsync(Func<Task> operation)
    {
        var strategy = _context.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(operation);
    }
}
