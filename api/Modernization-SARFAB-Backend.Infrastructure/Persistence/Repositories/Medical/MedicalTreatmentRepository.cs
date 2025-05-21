using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Medical;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Medical;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Medical;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Repositories.Medical
{
    public class MedicalTreatmentRepository : IMedicalTreatmentRepository
    {
        private readonly SARFABSystemDbContext _context;
        private readonly ILoggingService _loggingService;

        public MedicalTreatmentRepository(SARFABSystemDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }

        public async Task<int> CreateMedicalTreatment(MedicalTreatmentEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "La entidad no puede ser nula.");
            }

            try
            {
                var medicalTreatmentModel = new MedicalTreatment
                {
                    TreatmentDate = entity.TreatmentDate,
                    Diagnosis = entity.Diagnosis,
                    TreatmentDescription = entity.Description,
                    AttendingPersonId = entity.AttendingPersonId,
                    PatientPersonId = entity.PatientPersonId,
                    UserId = entity.UserId
                };

                _context.MedicalTreatments.Add(medicalTreatmentModel);
                await _context.SaveChangesAsync();

                return medicalTreatmentModel.TreatmentId;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL REGISTRAR TRATAMIENTO: {ex.Message}");
                throw new Exception("Ocurrió un error al registrar el tratamiento médico.", ex);
            }
        }

        public async Task<int> UpdateMedicalTreatment(MedicalTreatmentEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "La entidad no puede ser nula.");
            }

            try
            {
                var existingTreatment = await _context.MedicalTreatments.FindAsync(entity.Id);

                if (existingTreatment == null)
                {
                    throw new KeyNotFoundException($"No se encontró un tratamiento con el ID {entity.Id}.");
                }

                existingTreatment.TreatmentDate = entity.TreatmentDate;
                existingTreatment.Diagnosis = entity.Diagnosis;
                existingTreatment.TreatmentDescription = entity.Description;
                existingTreatment.AttendingPersonId = entity.AttendingPersonId;
                existingTreatment.PatientPersonId = entity.PatientPersonId;
                existingTreatment.UserId = entity.UserId;

                await _context.SaveChangesAsync();

                return existingTreatment.TreatmentId;
            }
            catch (Exception ex)
            {
                _loggingService.LogError($"ERROR AL ACTUALIZAR TRATAMIENTO: {ex.Message}");
                throw new Exception("Ocurrió un error al actualizar el tratamiento médico.", ex);
            }
        }

        public async Task<MedicalTreatmentEntity> GetMedicalTreatmentByIdAsync(int id)
        {
            var model = await _context.MedicalTreatments
                .Include(m => m.AttendingPerson)
                .Include(v => v.PatientPerson)
                .FirstOrDefaultAsync(m => m.Status == (sbyte)MedicalTreatmentEntity.TreatmentStatus.Active && m.TreatmentId == id);

            if (model == null)
                throw new BusinessException("Tratamiento no encontrado");

            var attendingPerson = new PersonEntity(model.AttendingPerson.PersonId, model.AttendingPerson.FirstName, model.AttendingPerson.LastName);

            var patientPerson = new PersonEntity(model.PatientPerson.PersonId, model.PatientPerson.FirstName, model.PatientPerson.LastName);


            var medicalTreatment = new MedicalTreatmentEntity(
                model.TreatmentId,
                model.TreatmentDate,
                model.Diagnosis,
                model.TreatmentDescription,
                attendingPerson,
                patientPerson
            );

            return medicalTreatment;
        }

        public async Task<(IEnumerable<MedicalTreatmentEntity>, int totalPages)> GetMedicalTreatmentsAsync(
            string? query, DateTime? startDate, DateTime? endDate, int? limit, int? page)
        {
            // Valores predeterminados
            int pageNumber = page ?? 1;
            int pageSize = limit ?? 10;

            // Construcción de la consulta con filtros condicionales
            var queryable = _context.MedicalTreatments
                .Include(m => m.AttendingPerson)
                .Include(m => m.PatientPerson)
                .Where(m => m.Status == (sbyte)MedicalTreatmentEntity.TreatmentStatus.Active)
                .AsQueryable();

            queryable = queryable.OrderByDescending(o => o.CreatedAt);

            var totalRecords = await queryable.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            // Filtro por búsqueda (query)
            if (!string.IsNullOrEmpty(query))
            {
                queryable = queryable.Where(m =>
                    m.PatientPerson.FirstName.Contains(query) ||
                    m.PatientPerson.LastName.Contains(query) ||
                    m.AttendingPerson.FirstName.Contains(query) ||
                    m.AttendingPerson.LastName.Contains(query));
            }

            // Filtro por rango de fechas
            if (startDate.HasValue)
            {
                queryable = queryable.Where(m => m.TreatmentDate >= startDate.Value.Date);
            }

            if (endDate.HasValue)
            {
                queryable = queryable.Where(m => m.TreatmentDate <= endDate.Value.Date.AddDays(1).AddSeconds(-1));
            }

            // Aplicar paginación
            queryable = queryable.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            // Obtener los datos
            var models = await queryable.ToListAsync();

            // Mapeo a entidades
            var medicalTreatments = models.Select(m =>
            {
                var attendingPerson = new PersonEntity(m.AttendingPerson.PersonId, m.AttendingPerson.FirstName, m.AttendingPerson.LastName);
                var patientPerson = new PersonEntity(m.PatientPerson.PersonId, m.PatientPerson.FirstName, m.PatientPerson.LastName);

                return new MedicalTreatmentEntity(
                    m.TreatmentId,
                    m.TreatmentDate,
                    m.Diagnosis,
                    m.TreatmentDescription,
                    attendingPerson,
                    patientPerson
                );
            });

            return (medicalTreatments, totalPages);
        }
    }
}
