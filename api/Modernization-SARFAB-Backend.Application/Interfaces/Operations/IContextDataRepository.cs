using System.Collections;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using System.Threading.Tasks;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations
{
    public interface IContextDataRepository
    {
        Task<OperationContextDataDTO> GetOperationContextDataAsync();
        Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithRankAsync();
        Task<IEnumerable<MilitaryOperationalDataDTO>> GetMilitaryPersonnelWithRankAsync();
        Task<DataOperationListFilterDTO> GetOperationListFilterDataAsync();
        Task<IEnumerable<OperationCategoryDTO>> GetOperationCategoriesAsync();
        Task<IEnumerable<DepartmentDTO>> GetDepartmentsAsync();
        Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithoutCourseAsync(int courseId);
    }
}