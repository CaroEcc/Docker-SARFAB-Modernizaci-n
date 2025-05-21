using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.VolunteerManagement;

public class VolunteerOperationRepository : IVolunteerOperationRepository
{
    private readonly SARFABSystemDbContext _context;
    
    public VolunteerOperationRepository(SARFABSystemDbContext context)
    {
        _context = context;
    }
    
    public async Task<(IEnumerable<VolunteerOperationReportDTO> Data, int TotalPages)> 
    GetVolunteerOperationsReportAsync(
        int volunteerId, 
        string? searchTerm,
        int? status,
        int? categoryId, 
        DateTime? startDate, 
        DateTime? endDate, 
        bool orderByDateAsc, 
        int page, 
        int pageSize)
    {
        var query = _context.PersonOperations
            .Where(po => po.Person.Volunteer.VolunteerId == volunteerId)
            .Select(po => po.Operation)
            .AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(o =>
                o.PersonOperations.Any(po =>
                    po.Role == "Responsable" &&
                    (po.Person.LastName.Contains(searchTerm) ||
                     po.Person.FirstName.Contains(searchTerm))) ||
                o.Municipality.Name.Contains(searchTerm) ||
                o.Address.Contains(searchTerm));
        }
        if (status.HasValue)
        {
            query = query.Where(o =>
                o.PersonOperations.Any(po =>
                    po.Person.Volunteer.VolunteerId == volunteerId &&
                    (int)po.Status == status.Value));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(o => o.OperationType.OperationCategoryId == categoryId);
        }

        if (startDate.HasValue && endDate.HasValue)
        {
            var startDateValue = startDate.Value.Date;
            var endDateValue = endDate.Value.Date.AddDays(1).AddSeconds(-1);
            query = query.Where(o => o.DepartureDate >= startDateValue && o.DepartureDate <= endDateValue);
        }

        query = orderByDateAsc 
            ? query.OrderBy(o => o.DepartureDate) 
            : query.OrderByDescending(o => o.DepartureDate);

        var totalRecords = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

        var data = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new VolunteerOperationReportDTO(
                o.DepartureDate,
                o.OperationType.OperationCategory.Name + " - " + o.OperationType.Name,
                o.Municipality.Name + " - " + o.Municipality.Province.Name + " - " + o.Municipality.Province.Department.Name,
                o.Address,
                o.PersonOperations
                    .Where(po => po.Role == "Responsable")
                    .Select(po => po.Person.Military.MilitaryRankAssignment.Rank.Abbreviation + " " +
                                  po.Person.LastName + " " + po.Person.FirstName)
                    .FirstOrDefault() ?? "Sin responsable",
                string.IsNullOrEmpty(o.Observations) ? "Ninguna" : o.Observations,
                o.PersonOperations
                    .Where(po => po.Person.Volunteer.VolunteerId == volunteerId)
                    .Select(po => (int)po.Status)
                    .FirstOrDefault()
            ))
            .ToListAsync();

        return (data, totalPages);
    }

}