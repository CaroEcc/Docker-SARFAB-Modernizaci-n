using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class HistoricalListVolunteerUseCase
    {
        private readonly IVolunteerRepository _volunteerRepository;

        public HistoricalListVolunteerUseCase(IVolunteerRepository volunteerRepository)
        {
            _volunteerRepository = volunteerRepository;
        }

        public async Task<(IEnumerable<HistoricalListVolunteersDTO> Data, int TotalPages)> ExecuteAsync(
            string searchTerm = null,
            int? gradeId = null,
            VolunteerEntity.VolunteerStatus? status = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10)
        {
            var volunteers = await _volunteerRepository.GetHistoricalListVolunteersAsync(
                searchTerm, gradeId, status, startDate, endDate, page, pageSize);

            var volunteerDTOs = volunteers.Data.Select(v => new HistoricalListVolunteersDTO
            {
                VolunteerId = v.Volunteer.VolunteerId,
                Name = v.Volunteer.Person.FirstName,
                LastName = v.Volunteer.Person.LastName,
                GradeName = v.GradeName,
                DapartureDate = (DateOnly)v.Volunteer.UpdatedAt,
                Reason = v.Volunteer.DischargeReason,
                volunteerStatus = v.Volunteer.Status
            });

            return (volunteerDTOs, volunteers.TotalPages);
        }
    }
}