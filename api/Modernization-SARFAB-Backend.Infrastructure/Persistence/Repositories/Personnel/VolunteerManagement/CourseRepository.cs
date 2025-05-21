using System.Runtime.InteropServices.JavaScript;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement.Courses;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.VolunteerManagement
{
    public class CourseRepository : ICourseRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly IMapper _mapper;

        public CourseRepository(SARFABSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CourseEntity> GetLastCompletedCourseAsync(int volunteerId)
        {
            var model = await _context.VolunteerCourses
                .Where(vc => vc.VolunteerId == volunteerId)
                .OrderByDescending(vc => vc.CompletionDate)
                .Select(vc => vc.Course)
                .FirstOrDefaultAsync();

            if (model == null)
                throw new BusinessException("No se encontró el último curso completado.");

            return new CourseEntity(model.Name);
        }

        public async Task<(IEnumerable<CourseEntity> Data, int TotalPages)> GetCoursesAsync(
            string? courseName = null,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(courseName))
            {
                query = query.Where(c => c.Name.Contains(courseName));
            }

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var models = await query
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var entities = models.Select(c => new CourseEntity(
                c.CourseId,
                c.Name,
                c.Description
            )).ToList();

            return (entities, totalPages);
        }

        public async Task<CourseEntity> GetCourseById(int id)
        {
            var model = await _context.Courses
                .FirstOrDefaultAsync(c => c.CourseId == id);
            if (model == null)
                throw new BusinessException("No se encontró el curso.");
            return _mapper.Map<CourseEntity>(model);
        }
        public async Task<IEnumerable<CourseSelectDTO>> GetCoursesForSelectAsync(int volunteerId)
        {
            var takenCourseIds = await _context.VolunteerCourses
                .Where(vc => vc.VolunteerId == volunteerId)
                .Select(vc => vc.CourseId)
                .ToListAsync();
    
            return await _context.Courses
                .Where(c => !takenCourseIds.Contains(c.CourseId))
                .OrderBy(c => c.Name)
                .Select(c => new CourseSelectDTO(c.CourseId, c.Name))
                .ToListAsync();
        }
        
        public async Task AssignCourseAsync(VolunteerCourseEntity volunteerCourse)
        {
            var model = new VolunteerCourse
            {
                VolunteerId = volunteerCourse.VolunteerId,
                CourseId = volunteerCourse.CourseId,
                CompletionDate = volunteerCourse.CompletionDate,
                UserId = volunteerCourse.UserId
            };

            _context.VolunteerCourses.Add(model);
            await _context.SaveChangesAsync();
        }
        
        public async Task<(IEnumerable<CompletedCourseDTO> Data, int TotalPages)> GetCompletedCoursesByVolunteerAsync(int volunteerId, int page, int pageSize)
        {
            var query = _context.VolunteerCourses
                .Where(vc => vc.VolunteerId == volunteerId)
                .OrderByDescending(vc => vc.CompletionDate)
                .Select(vc => new CompletedCourseDTO(
                    vc.Course.Name,
                    vc.CompletionDate,
                    vc.Course.Description
                ));

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, totalPages);
        }

        public async Task<int> CreateCourseAsync(CourseEntity course)
        {
            var model = new Course
            {
                Name = course.Name,
                Description = course.Description,
                UserId = course.UserId
            };

            _context.Courses.Add(model);
            await _context.SaveChangesAsync();

            return model.CourseId;
        }
        public async Task UpdateCourseAsync(CourseEntity course)
        {
            var model = await _context.Courses
                .FirstOrDefaultAsync(c => c.CourseId == course.CourseId);

            if (model == null)
                return;

            model.Name = course.Name;
            model.Description = course.Description;

            await _context.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<CourseParticipantDTO>> GetCourseParticipantsAsync(int courseId)
        {
            return await _context.VolunteerCourses
                .Where(cp => cp.CourseId == courseId)
                .Select(cp => new CourseParticipantDTO
                {
                    FullName = cp.Volunteer.VolunteerNavigation.LastName + " " + cp.Volunteer.VolunteerNavigation.FirstName,
                    Rank = cp.Volunteer.VolunteerGrade.Grade.Name,
                    CompletionDate = cp.CompletionDate
                })
                .ToListAsync();
        }
        
        public async Task AssignMultipleVolunteersToCourseAsync(IEnumerable<VolunteerCourseEntity> volunteerCourses)
        {
            var models = volunteerCourses.Select(vc => new VolunteerCourse
            {
                VolunteerId = vc.VolunteerId,
                CourseId = vc.CourseId,
                CompletionDate = vc.CompletionDate,
                UserId = vc.UserId
            }).ToList();

            _context.VolunteerCourses.AddRange(models);
            await _context.SaveChangesAsync();
        }
    }
}
