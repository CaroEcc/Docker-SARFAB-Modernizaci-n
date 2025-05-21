using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.Services.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Operations
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContextDataController : ControllerBase
    {
        private readonly ContextDataApplicationService _contextDataService;

        public ContextDataController(ContextDataApplicationService contextDataService)
        {
            _contextDataService = contextDataService;
        }

        [HttpGet("operation-context")]
        public async Task<ActionResult<OperationContextDataDTO>> GetOperationContextData()
        {
            var contextData = await _contextDataService.GetOperationContextDataAsync();
            return Ok(contextData);
        }
        
        [HttpGet("volunteers-with-rank")]
        public async Task<ActionResult<IEnumerable<VolunteerOperationalDataDTO>>> GetVolunteersWithRank()
        {
            var volunteers = await _contextDataService.GetVolunteersWithRankAsync();
            return Ok(volunteers);
        }
        
        [HttpGet("military-personnel-with-rank")]
        public async Task<ActionResult<IEnumerable<MilitaryOperationalDataDTO>>> GetMilitaryPersonnelWithRank()
        {
            var militaryPersonnel = await _contextDataService.GetMilitaryPersonnelWithRankAsync();
            return Ok(militaryPersonnel);
        }
        
        [HttpGet("operation-list-filter")]
        public async Task<ActionResult<DataOperationListFilterDTO>> GetOperationListFilterData()
        {
            var operationListFilterData = await _contextDataService.GetOperationListFilterDataAsync();
            return Ok(operationListFilterData);
        }

        [HttpGet("operation-categories")]
        public async Task<ActionResult<IEnumerable<OperationCategoryDTO>>> GetOperationCategories()
        {
            var operationCategories = await _contextDataService.GetOperationCategoriesAsync();
            return Ok(operationCategories);
        }
        
        [HttpGet("departments")]
        public async Task<ActionResult<IEnumerable<DepartmentDTO>>> GetOperationDepartments()
        {
            var operationDepartments = await _contextDataService.GetDepartmentsAsync();
            return Ok(operationDepartments);
        }

        [HttpGet("volunteers-without-course/{courseId}")]
        public async Task<ActionResult<IEnumerable<VolunteerOperationalDataDTO>>> GetVolunteersWithoutCourse(
            int courseId)
        {
            var volunteers = await _contextDataService.GetVolunteersWithoutCourseAsync(courseId);
            return Ok(volunteers);
        }
    }
}