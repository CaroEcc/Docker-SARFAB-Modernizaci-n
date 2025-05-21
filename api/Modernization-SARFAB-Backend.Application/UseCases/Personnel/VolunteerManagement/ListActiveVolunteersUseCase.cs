using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class ListActiveVolunteersUseCase
    {
        private readonly IVolunteerRepository _volunteerRepository;

        public ListActiveVolunteersUseCase(IVolunteerRepository volunteerRepository)
        {
            _volunteerRepository = volunteerRepository;
        }

        public async Task<(IEnumerable<VolunteerListDTO> Data, int TotalPages)> ExecuteAsync(
            string searchTerm = null,
            int? gradeId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10)
        {
            var volunteersWithGrade = await _volunteerRepository.GetActiveVolunteersAsync(
                searchTerm, gradeId, orderByLastNameAsc, page, pageSize);

            var volunteerDTOs = volunteersWithGrade.Data.Select(vg => new VolunteerListDTO
            {
                Id = vg.Volunteer.VolunteerId,
                Name = vg.Volunteer.Person.FirstName,
                LastName = vg.Volunteer.Person.LastName,
                Ci = vg.Volunteer.Ci,
                MobilePhone = vg.Volunteer.MobilePhone,
                Email = vg.Volunteer.Email,
                GradeName = vg.GradeName,
                CanPromote = CanPromote(vg.GradeName)
            });

            return (volunteerDTOs, volunteersWithGrade.TotalPages);
        }
        
        private bool CanPromote(string gradeName)
        {
            return gradeName != "Rescatista";
        }
    }
}