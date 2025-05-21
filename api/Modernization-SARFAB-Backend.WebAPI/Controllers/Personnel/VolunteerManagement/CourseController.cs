using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Services.Common;
using Modernization_SARFAB_Backend.Application.Services.Personnel;

namespace Modernization_SARFAB_Backend.WebAPI.Controllers.Personnel.VolunteerManagement
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly CourseApplicationService _courseApplicationService;
        private readonly UserContextService _userContextService;

        public CourseController(
            CourseApplicationService courseApplicationService,
            UserContextService userContextService)
        {
            _courseApplicationService = courseApplicationService;
            _userContextService = userContextService;
        }

        [HttpGet("volunteer-last-course/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _courseApplicationService.GetLastCompletedCourseAsync(id);
            return result != null
                ? Ok(result)
                : NotFound(new { Message = $"No se encontró el último curso del voluntario con ID {id}." });
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses(
            [FromQuery] string? courseName = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (data, totalPages) = await _courseApplicationService.GetCoursesAsync(courseName, page, pageSize);

            return Ok(new { Data = data, TotalPages = totalPages });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var result = await _courseApplicationService.GetCourseByIdAsync(id);
            return result != null
                ? Ok(result)
                : NotFound(new { Message = $"No se encontró el curso con ID {id}." });
        }

        [HttpGet("courses-select")]
        public async Task<IActionResult> GetCoursesForSelect([FromQuery] int volunteerId)
        {
            var result = await _courseApplicationService.GetCoursesForSelectAsync(volunteerId);
            return result.Any()
                ? Ok(result)
                : NotFound(new { Message = "No hay cursos disponibles." });
        }

        [HttpPost("assign-course")]
        public async Task<IActionResult> AssignCourse([FromBody] AssignCourseDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            var (userId, userName) = userClaims.Value;

            try
            {
                await _courseApplicationService.AssignCourseAsync(request, userId, userName);
                return Ok(new { Message = "Curso asignado correctamente." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "Ocurrió un error al asignar el curso." });
            }
        }
        
        [HttpGet("volunteer/{volunteerId}/completed-courses")]
        public async Task<IActionResult> GetCompletedCoursesByVolunteer(
            int volunteerId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (data, totalPages) = await _courseApplicationService.GetCompletedCoursesByVolunteerAsync(volunteerId, page, pageSize);

            return data.Any()
                ? Ok(new { Data = data, TotalPages = totalPages })
                : NotFound(new { Message = $"El voluntario no tiene cursos registrados aún." });
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            var (userId, userName) = userClaims.Value;

            try
            {
                await _courseApplicationService.CreateCourseAsync(request, userId, userName);
                return Ok(new { Message = "Curso creado correctamente." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "Ocurrió un error al crear el curso." });
            }
        }
        
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateCourse([FromBody] UpdateCourseDTO request, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            var (userId, userName) = userClaims.Value;

            try
            {
                await _courseApplicationService.UpdateCourseAsync(request, id, userName);
                return Ok(new { Message = "Curso actualizado correctamente." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "Ocurrió un error al actualizar el curso." });
            }
        }
        
        [HttpPost("assign-multiple-volunteers")]
        public async Task<IActionResult> AssignMultipleVolunteersToCourse([FromBody] AssignMultipleVolunteersToCourseDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userClaims = _userContextService.GetUserClaims();
            if (userClaims == null)
                return BadRequest(new { Message = "User claims not found." });

            var (userId, userName) = userClaims.Value;

            try
            {
                await _courseApplicationService.AssignMultipleVolunteersToCourseAsync(request, userId, userName);
                return Ok(new { Message = "Curso asignado correctamente a múltiples voluntarios." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "Ocurrió un error al asignar el curso a múltiples voluntarios." });
            }
        }
    }
}
