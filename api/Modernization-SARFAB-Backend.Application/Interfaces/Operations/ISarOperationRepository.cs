using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Application.DTOs.Operations.OperationContextData;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Operations
{
    public interface ISarOperationRepository
    {
        Task<int> CreateSarOperationAsync(
            SarOperationEntity operation,
            OperationPersonDTO responsible,
            IEnumerable<OperationPersonDTO> personnel);

        Task UpdateOperationDetailsAsync(SarOperationEntity operation, short userId);

        Task UpdateResponsibleAsync(int operationId, MilitaryEntity responsible, short userId);

        Task UpdateAssignedPersonnelAsync(int operationId, List<MilitaryEntity> militaryPersonnel, List<VolunteerEntity> volunteerPersonnel, short userId);

        Task<(IEnumerable<ActiveOperationDTO> Data, int TotalPages)> GetActiveOperationsAsync(
            string searchTerm = null,
            int? status = (int)SarOperationEntity.OperationStatus.Active,
            int? municipalityId = null,
            int? categoryId = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            int page = 1,
            int pageSize = 10);
        
        Task UpdateOperationStatusAsync(SarOperationEntity operation);
        
        Task<SarOperationDetailDTO> GetOperationByIdAsync(int operationId);
        Task<OperationPersonnelDTO> GetResponsibleByOperationIdAsync(int operationId);
        Task<IEnumerable<OperationPersonnelDTO>> GetPersonnelByOperationIdAsync(int operationId);
        Task<AbsenceMarkingDTO?> GetOperationAbsenceMarkingAsync(int operationId);
        Task<IEnumerable<OperationPersonnelDTO>> GetOperationVolunteersAbsenceMarkingAsync(int operationId);
        Task<SarOperationEntity> GetOperationEntityByIdAsync(int operationId);
        Task<int> CreateRequesterAsync(CreateRequesterDTO requester);
        Task UpdateRequesterAsync(int requesterId, CreateRequesterDTO requester);
        Task UpdatePersonOperationAsync(PersonOperationEntity personOperation);
    }
}