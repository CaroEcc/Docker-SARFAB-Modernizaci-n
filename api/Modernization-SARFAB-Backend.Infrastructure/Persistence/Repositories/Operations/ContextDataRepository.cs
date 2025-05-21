using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using System.Collections.Generic;
using System.Threading.Tasks;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Operations
{
    public class ContextDataRepository : IContextDataRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly IMapper _mapper;

        public ContextDataRepository(SARFABSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OperationContextDataDTO> GetOperationContextDataAsync()
        {
            var contextData = new OperationContextDataDTO
            {
                Departments = await _context.Departments
                    .ProjectTo<DepartmentDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(),

                Provinces = await _context.Provinces
                    .ProjectTo<ProvinceDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(),

                Municipalities = await _context.Municipalities
                    .ProjectTo<MunicipalityDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(),

                OperationCategories = await _context.OperationCategories
                    .ProjectTo<OperationCategoryDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(),

                OperationTypes = await _context.OperationTypes
                    .ProjectTo<OperationTypeDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return contextData;
        }

        public async Task<IEnumerable<OperationCategoryDTO>> GetOperationCategoriesAsync()
        {
            var operationCategories = await _context.OperationCategories
                .ProjectTo<OperationCategoryDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return operationCategories;
        }

        public async Task<IEnumerable<DepartmentDTO>> GetDepartmentsAsync()
        {
            var departments = await _context.Departments
                .ProjectTo<DepartmentDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return departments;
        }

        public async Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithoutCourseAsync(int courseId)
        {
            var volunteers = await _context.Volunteers
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade)
                .ThenInclude(vg => vg.Grade)
                .Where(v => v.Status == (sbyte)VolunteerEntity.VolunteerStatus.Active)
                .Where(v => !v.VolunteerCourses.Any(vc => vc.CourseId == courseId))
                .Select(v => new VolunteerOperationalDataDTO
                {
                    VolunteerId = v.VolunteerId,
                    FirstName = v.VolunteerNavigation.FirstName,
                    LastName = v.VolunteerNavigation.LastName,
                    GradeName = v.VolunteerGrade!.Grade.Name,
                    Abbreviation = v.VolunteerGrade.Grade.Abbreviation
                })
                .ToListAsync();
            return volunteers;
        }

        public async Task<IEnumerable<VolunteerOperationalDataDTO>> GetVolunteersWithRankAsync()
        {
            var volunteers = await _context.Volunteers
                .Include(v => v.VolunteerNavigation)
                .Include(v => v.VolunteerGrade)
                .ThenInclude(vg => vg.Grade)
                .Where(v => v.Status == (sbyte)VolunteerEntity.VolunteerStatus.Active)
                .Select(v => new VolunteerOperationalDataDTO
                {
                    VolunteerId = v.VolunteerId,
                    FirstName = v.VolunteerNavigation.FirstName,
                    LastName = v.VolunteerNavigation.LastName,
                    GradeName = v.VolunteerGrade.Grade.Name,
                    Abbreviation = v.VolunteerGrade.Grade.Abbreviation
                })
                .ToListAsync();

            return volunteers;
        }

        public async Task<IEnumerable<MilitaryOperationalDataDTO>> GetMilitaryPersonnelWithRankAsync()
        {
            var militaryPersonnel = await _context.Militaries
                .Include(m => m.MilitaryNavigation)
                .Include(m => m.MilitaryRankAssignment)
                .ThenInclude(mr => mr.Rank)
                .Where(m => m.Status == (sbyte)MilitaryEntity.MilitaryStatus.Active)
                .Select(m => new MilitaryOperationalDataDTO
                {
                    MilitaryId = m.MilitaryId,
                    FirstName = m.MilitaryNavigation.FirstName,
                    LastName = m.MilitaryNavigation.LastName,
                    RankName = m.MilitaryRankAssignment.Rank.Name,
                    Abbreviation = m.MilitaryRankAssignment.Rank.Abbreviation
                })
                .ToListAsync();

            return militaryPersonnel;
        }
        
        public async Task<DataOperationListFilterDTO> GetOperationListFilterDataAsync()
        {
            var data = new DataOperationListFilterDTO
            {
                Municipalities = await _context.Municipalities
                    .ProjectTo<MunicipalityDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(),

                OperationCategories = await _context.OperationCategories
                    .ProjectTo<OperationCategoryDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return data;
        }

    }
}
