namespace Modernization_SARFAB_Backend.Application.DTOs.Common;

public class PagedResult<T>
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int TotalPages { get; set; }
}