using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;


namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetVolunteerByIdUseCase
    {
        private readonly IVolunteerRepository _repository;

        public GetVolunteerByIdUseCase(IVolunteerRepository repository)
        {
            _repository = repository;
        }

        public async Task<VolunteerDetailsDTO> ExecuteAsync(int id)
        {
            var (volunteer, gradeName, departmentName) = await _repository.GetVolunteerByIdAsync(id);
            return new VolunteerDetailsDTO
            {
                Id = volunteer.VolunteerId,
                FirstName = volunteer.Person.FirstName,
                LastName = volunteer.Person.LastName,
                DepartmentName = departmentName,
                HomeAddress = volunteer.HomeAddress,
                Ci = volunteer.Ci,
                BirthDate = volunteer.BirthDate,
                Phone = volunteer.Phone,
                MobilePhone = volunteer.MobilePhone,
                GradeName = gradeName,
                Email = volunteer.Email,
                Occupation = volunteer.Occupation,
                Religion = volunteer.Religion,
                Allergies = volunteer.Allergies,
                BloodType = volunteer.BloodType,
                DistinctiveFeatures = volunteer.DistinctiveFeatures,
                VolunteerType = volunteer.VolunteerType,
                EmergencyContactFullName = volunteer.EmergencyContactFullName,
                EmergencyContactRelation = volunteer.EmergencyContactRelation,
                EmergencyContactAddress = volunteer.EmergencyContactAddress,
                EmergencyContactPhone = volunteer.EmergencyContactPhone,
                EmergencyContactMobile = volunteer.EmergencyContactMobile
            };
        }
    }
}
