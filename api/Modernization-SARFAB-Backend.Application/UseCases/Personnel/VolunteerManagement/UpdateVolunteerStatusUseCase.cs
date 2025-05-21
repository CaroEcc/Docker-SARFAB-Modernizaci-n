using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.VolunteerEntity;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class UpdateVolunteerStatusUseCase
    {
        private readonly IVolunteerRepository _repository;
        private readonly ILoggingService _loggingService;
        public UpdateVolunteerStatusUseCase(IVolunteerRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }
        public async Task ExecuteAsync(int id, UpdateVolunteerStatusDTO dto, string userName)
        {
            try
            {
                var (entity, _, _) = await _repository.GetVolunteerByIdAsync(id);
                var dischargeReason = string.IsNullOrWhiteSpace(dto.DischargeReason) ? "No especificado" : dto.DischargeReason;
                switch (dto.Status)
                {
                    case VolunteerStatus.Active:
                        entity.ActivateVolunteer();
                        break;
                    case VolunteerStatus.Deleted:
                        entity.DeactiveVolunteer(dischargeReason);
                        break;
                    case VolunteerStatus.ServiceCompleted:
                        entity.CompleteService(dischargeReason);
                        break;
                    default:
                        throw new BusinessException("Estado no válido");
                }
                await _repository.UpdateStatusAsync(entity);
                _loggingService.LogInformation($"El usuario <{userName}> actualizó el estado del voluntario con Id: {id} a estado: {entity.Status}");
            }
            catch (BusinessException) { throw; }
            catch (Exception)
            {
                throw new BusinessException("Error al actualizar estado");
            }
        }
    }
}
