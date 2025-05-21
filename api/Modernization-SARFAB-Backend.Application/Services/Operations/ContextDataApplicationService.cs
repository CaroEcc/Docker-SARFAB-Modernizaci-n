using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Application.UseCases.DataContext;
using Modernization_SARFAB_Backend.Application.UseCases.Operations;

namespace Modernization_SARFAB_Backend.Application.Services.Operations
{
    public class ContextDataApplicationService
    {
        private readonly GetOperationContextDataUseCase _getOperationContextDataUseCase;
        private readonly GetVolunteersWithRankUseCase _getVolunteersWithRankUseCase;
        private readonly GetMilitaryPersonnelWithRankUseCase _getMilitaryPersonnelWithRankUseCase;
        private readonly GetOperationListFilterDataUseCase _getOperationListFilterDataUseCase;
        private readonly GetOperationCategoryUseCase _getOperationCategoryUseCase;
        private readonly GetDepartmentsUseCase _getDepartmentsUseCase;
        private readonly GetVolunteersWithoutCourse _getVolunteersWithoutCourse;
       

        public ContextDataApplicationService(
            GetOperationContextDataUseCase getOperationContextDataUseCase, 
            GetVolunteersWithRankUseCase getVolunteersWithRankUseCase, 
            GetMilitaryPersonnelWithRankUseCase getMilitaryPersonnelWithRankUseCase,
            GetOperationListFilterDataUseCase getOperationListFilterDataUseCase,
            GetOperationCategoryUseCase getOperationCategoryUseCase,
            GetDepartmentsUseCase getDepartmentsUseCase,
            GetVolunteersWithoutCourse getVolunteersWithoutCourse)
        {
            _getOperationContextDataUseCase = getOperationContextDataUseCase;
            _getVolunteersWithRankUseCase = getVolunteersWithRankUseCase;
            _getMilitaryPersonnelWithRankUseCase = getMilitaryPersonnelWithRankUseCase;
            _getOperationListFilterDataUseCase = getOperationListFilterDataUseCase;
            _getOperationCategoryUseCase = getOperationCategoryUseCase;
            _getDepartmentsUseCase = getDepartmentsUseCase;
            _getVolunteersWithoutCourse = getVolunteersWithoutCourse;
        }

        public async Task<OperationContextDataDTO> GetOperationContextDataAsync()
            => await _getOperationContextDataUseCase.ExecuteAsync();
        
        public async Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithRankAsync()
            => await _getVolunteersWithRankUseCase.ExecuteAsync();
        
        public async Task<IEnumerable<MilitaryOperationalDataDTO>> GetMilitaryPersonnelWithRankAsync()
            => await _getMilitaryPersonnelWithRankUseCase.ExecuteAsync();
        
        public async Task<DataOperationListFilterDTO> GetOperationListFilterDataAsync()
            => await _getOperationListFilterDataUseCase.ExecuteAsync();
        
        public async Task<IEnumerable<OperationCategoryDTO>> GetOperationCategoriesAsync()
            => await _getOperationCategoryUseCase.ExecuteAsync();
        
        public async Task<IEnumerable<DepartmentDTO>> GetDepartmentsAsync()
            => await _getDepartmentsUseCase.ExecuteAsync();
        public async Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithoutCourseAsync(int courseId)
            => await _getVolunteersWithoutCourse.Execute(courseId);
    }
}