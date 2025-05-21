using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class ListCoursesUseCase
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        public ListCoursesUseCase(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<CourseDTO> Data, int TotalPages)> ExecuteAsync(string? courseName, int page, int pageSize)
        {
            var (courses, totalPages) = await _courseRepository.GetCoursesAsync(courseName, page, pageSize);
            var courseDTOs = _mapper.Map<IEnumerable<CourseDTO>>(courses);
    
            return (courseDTOs, totalPages);
        }
    }
}
