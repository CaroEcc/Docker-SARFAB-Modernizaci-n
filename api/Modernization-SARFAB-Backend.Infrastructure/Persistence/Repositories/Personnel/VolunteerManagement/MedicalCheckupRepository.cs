using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Exceptions;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Personnel.VolunteerManagement
{
    public class MedicalCheckupRepository : IMedicalCheckupRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly IMapper _mapper;

        public MedicalCheckupRepository(SARFABSystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MedicalCheckupEntity>> GetMedicalCheckupsAsync(int volunteerId)
        {
            var models = await _context.MedicalCheckups
                .Where(mc => mc.VolunteerId == volunteerId)
                .OrderByDescending(mc => mc.CheckupDate)
                .ToListAsync();
            return _mapper.Map<IEnumerable<MedicalCheckupEntity>>(models);
        }

        public async Task<MedicalCheckupEntity> GetMedicalCheckupByIdAsync(int id)
        {
            var model = await _context.MedicalCheckups
                .FirstOrDefaultAsync(mc => mc.CheckupId == id);
            return _mapper.Map<MedicalCheckupEntity>(model);
        }

        public async Task<int> CreateMedicalCheckupAsync(MedicalCheckupEntity medicalCheckup)
        {
            var model = new MedicalCheckup
            {
                VolunteerId = medicalCheckup.VolunteerId,
                CheckupDate = medicalCheckup.CheckupDate,
                ExpirationDate = medicalCheckup.ExpirationDate,
                Observations = medicalCheckup.Observations,
                UserId = medicalCheckup.UserId
            };
            _context.MedicalCheckups.Add(model);
            await _context.SaveChangesAsync();
            return model.CheckupId;
        }

        public async Task UpdateMedicalCheckupAsync(MedicalCheckupEntity medicalCheckup)
        {
            var model = await _context.MedicalCheckups
                .FirstOrDefaultAsync(mc => mc.CheckupId == medicalCheckup.CheckupId);
            if (model == null)
                throw new InfrastructureException("Medical checkup not found");
            model.CheckupDate = medicalCheckup.CheckupDate;
            model.ExpirationDate = medicalCheckup.ExpirationDate;
            model.Observations = medicalCheckup.Observations;
            
            await _context.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<MedicalCheckupEntity>> GetExpiringCheckupsAsync(DateOnly targetDate)
        {
            var checkups = await _context.MedicalCheckups
                .Where(mc => mc.ExpirationDate == targetDate)
                .ToListAsync();

            return _mapper.Map<IEnumerable<MedicalCheckupEntity>>(checkups);
        }
        public async Task<IEnumerable<MedicalCheckupEntity>> GetExpiredCheckupsWithoutRenewalAsync(DateOnly today)
        {
            var allExpired = await _context.MedicalCheckups
                .Where(mc => mc.ExpirationDate < today)
                .ToListAsync();

            var latestExpiredCheckups = allExpired
                .GroupBy(mc => mc.VolunteerId)
                .Select(g => g.OrderByDescending(mc => mc.CheckupDate).First())
                .ToList();

            return latestExpiredCheckups.Select(mc => new MedicalCheckupEntity(
                checkupId: mc.CheckupId,
                volunteerId: mc.VolunteerId,
                checkupDate: mc.CheckupDate,
                expirationDate: mc.ExpirationDate,
                observations: mc.Observations,
                userId: mc.UserId
            ));
        }
    }
}
