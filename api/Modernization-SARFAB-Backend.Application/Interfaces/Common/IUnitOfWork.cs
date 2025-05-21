namespace Modernization_SARFAB_Backend.Application.Interfaces.Common;

public interface IUnitOfWork : IDisposable
{
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
    Task ExecuteWithStrategyAsync(Func<Task> operation);
}
