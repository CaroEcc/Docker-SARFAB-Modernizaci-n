using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.VolunteerManagement
{
    public class DemeritPointRepository : IDemeritPointRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly IMapper _mapper;

        public DemeritPointRepository(SARFABSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> GetTotalPointsLost(int volunteerId)
        {
            var totalPointsLost = await _context.DemeritPoints
                .Where(dp => dp.VolunteerId == volunteerId)
                .SumAsync(dp => dp.PointsLost);
            return totalPointsLost;
        }

        public async Task<IEnumerable<DemeritPointEntity>> GetListLostPoints(int volunteerId)
        {
            var lostPoints = await _context.DemeritPoints
                .Where(dp => dp.VolunteerId == volunteerId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<DemeritPointEntity>>(lostPoints);
        }
        
        public async Task CreateDemeritPointAsync(DemeritPointEntity demeritPoint)
        {
            var model = new DemeritPoint
            {
                VolunteerId = demeritPoint.VolunteerId,
                PointsLost = demeritPoint.PointsLost,
                Reason = demeritPoint.Reason,
                Date = demeritPoint.Date,
                Observation = demeritPoint.Observation,
                UserId = demeritPoint.UserId
            };

            await _context.DemeritPoints.AddAsync(model);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<(int VolunteerId, int TotalPointsLost)>> GetTotalPointsLostForAllVolunteersAsync()
        {
            var result = await _context.DemeritPoints
                .GroupBy(dp => dp.VolunteerId)
                .Select(g => new
                {
                    VolunteerId = g.Key,
                    Total = g.Sum(x => x.PointsLost)
                })
                .ToListAsync();

            return result.Select(x => (x.VolunteerId, x.Total));
        }

        public async Task DeleteDemeritPointAsync(int id)
        {
            var demeritPoint = await _context.DemeritPoints.FindAsync(id);
            if (demeritPoint != null)
            {
                _context.DemeritPoints.Remove(demeritPoint);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Demerit point not found");
            }
        }

    }
}
