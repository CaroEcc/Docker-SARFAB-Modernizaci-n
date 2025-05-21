using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.MilitaryEntity;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class UpdateMilitaryStatusUseCase
    {
        private readonly IMilitaryRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateMilitaryStatusUseCase(IMilitaryRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int id, MilitaryStatus status, string userName)
        {
            try
            {
                var (entity, _) = await _repository.GetMilitaryByIdAsync(id);
                switch (status)
                {
                    case MilitaryStatus.Active:
                        entity.ActivateMilitary();
                        break;
                    case MilitaryStatus.Inactive:
                        entity.DeactivateMilitary();
                        break;
                    default:
                        throw new BusinessException("Estado no válido");
                }
                await _repository.UpdateStatusAsync(entity);
                _loggingService.LogInformation($"El usuario <{userName}> actualizó el estado del militar con Id: {id} a estado: {entity.Status}");
            }
            catch (BusinessException) { throw; }
            catch (Exception)
            {
                throw new BusinessException("Error al actualizar estado");
            }
        }
    }
}
