using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Services.Personnel
{
    public class VolunteerAplicationService
    {
        private readonly CreateVolunteerUseCase _createVolunteerUseCase;
        private readonly ListActiveVolunteersUseCase _listActiveVolunteersUseCase;
        private readonly GetVolunteerByIdUseCase _getVolunteerByIdUseCase;
        private readonly UpdateVolunteerUseCase _updateVolunteerUseCase;
        private readonly HistoricalListVolunteerUseCase _listHistoricalVolunteersUseCase;
        private readonly UpdateVolunteerStatusUseCase _updateVolunteerStatusUseCase;
        private readonly GetAllVolunteerGradesUseCase _getAllVolunteerGradesUseCase;
        public VolunteerAplicationService(CreateVolunteerUseCase createVolunteerUseCase, ListActiveVolunteersUseCase listActiveVolunteersUseCase,
            GetVolunteerByIdUseCase getVolunteerByIdUseCase, UpdateVolunteerUseCase updateVolunteerUseCase, HistoricalListVolunteerUseCase listHistoricalVolunteersUseCase, 
            UpdateVolunteerStatusUseCase updateVolunteerStatusUseCase, GetAllVolunteerGradesUseCase getAllVolunteerGradesUseCase)
        {
            _createVolunteerUseCase = createVolunteerUseCase;
            _listActiveVolunteersUseCase = listActiveVolunteersUseCase;
            _getVolunteerByIdUseCase = getVolunteerByIdUseCase;
            _updateVolunteerUseCase = updateVolunteerUseCase;
            _listHistoricalVolunteersUseCase = listHistoricalVolunteersUseCase;
            _updateVolunteerStatusUseCase = updateVolunteerStatusUseCase;
            _getAllVolunteerGradesUseCase = getAllVolunteerGradesUseCase;

        }

        public async Task CreateAsync(CreateVolunteerDTO request, short userId, string userName)
        => await _createVolunteerUseCase.ExecuteAsync(request, userId, userName);

        public async Task<(IEnumerable<VolunteerListDTO> Data, int TotalPages)> GetActiveVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            bool orderByLastNameAsc = true,
            int page = 1,
            int pageSize = 10) =>
            await _listActiveVolunteersUseCase.ExecuteAsync(searchTerm, gradeId, orderByLastNameAsc, page, pageSize);
        
        public async Task<VolunteerDetailsDTO> GetVolunteerDetailsAsync(int id) => await _getVolunteerByIdUseCase.ExecuteAsync(id);
        public async Task UpdateVolunteerAsync(int id, UpdateVolunteerDTO request, string userName)
            => await _updateVolunteerUseCase.ExecuteAsync(id, request, userName);
        
        public async Task<(IEnumerable<HistoricalListVolunteersDTO> Data, int TotalPages)> GetHistoricalListVolunteersAsync(
            string searchTerm = null,
            int? gradeId = null,
            VolunteerEntity.VolunteerStatus? status = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10) =>
            await _listHistoricalVolunteersUseCase.ExecuteAsync(searchTerm, gradeId, status, startDate, endDate, page, pageSize);
        
        public async Task UpdateVolunteerStatusAsync(int id, UpdateVolunteerStatusDTO request, string userName)
            => await _updateVolunteerStatusUseCase.ExecuteAsync(id, request, userName);
        
        public async Task<IEnumerable<RankGradeDTO>> GetAllGradesAsync() => await _getAllVolunteerGradesUseCase.ExecuteAsync();
    }
}
