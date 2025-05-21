namespace Modernization_SARFAB_Backend.Application.Interfaces.Common
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<int> AddAsync(T entity);
        Task<T> GetByIdAsync(int id);
        Task UpdateAsync(T entity);
        Task UpdateStatusAsync(T entity);
    }
}
