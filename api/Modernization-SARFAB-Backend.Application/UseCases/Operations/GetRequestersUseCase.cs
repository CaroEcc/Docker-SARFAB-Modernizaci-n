using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations;

public class GetRequestersUseCase
{
    private readonly IRequesterRepository _requesterRepository;

    public GetRequestersUseCase(IRequesterRepository requesterRepository)
    {
        _requesterRepository = requesterRepository;
    }

    public async Task<(IEnumerable<RequesterDTO> Data, int TotalPages)> ExecuteAsync(string searchTerm = null, int page = 1, int pageSize = 10)
    {
        return await _requesterRepository.GetRequestersAsync(searchTerm, page, pageSize);
    }
}
