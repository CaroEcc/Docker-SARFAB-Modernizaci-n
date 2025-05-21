using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class VolunteerMedicalChecklistUseCase
    {
        private readonly IMedicalCheckupRepository _repository;
        private readonly IMapper _mapper;

        public VolunteerMedicalChecklistUseCase(IMedicalCheckupRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VolunteerMedicalCheckDTO>> ExecuteAsync(int volunteerId)
        {
            var medicalCheckupsEntity = await _repository.GetMedicalCheckupsAsync(volunteerId);
            return _mapper.Map<IEnumerable<VolunteerMedicalCheckDTO>>(medicalCheckupsEntity);
        }
    }
}
