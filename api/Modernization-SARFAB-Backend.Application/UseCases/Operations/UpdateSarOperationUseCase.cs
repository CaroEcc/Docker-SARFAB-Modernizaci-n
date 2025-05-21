using Modernization_SARFAB_Backend.Application.DTOs.Operations;
using Modernization_SARFAB_Backend.Domain.Entities.Operations;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Operations;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;

namespace Modernization_SARFAB_Backend.Application.UseCases.Operations
{
    public class UpdateSarOperationUseCase
    {
        private readonly ISarOperationRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public UpdateSarOperationUseCase(ISarOperationRepository repository, IUnitOfWork unitOfWork, ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int operationId, UpdateSarOperationDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();

                try
                {
                    var existingOperation = await _repository.GetOperationEntityByIdAsync(operationId);
                    if (existingOperation == null)
                        throw new BusinessException("Operación no encontrada");

                    var operationEntity = new SarOperationEntity(
                        operationId,
                        existingOperation.Address,
                        existingOperation.DepartureDate,
                        existingOperation.OperationTypeId,
                        existingOperation.MunicipalityId,
                        existingOperation.RequesterId,
                        existingOperation.ArrivalDate
                    );

                    operationEntity.UpdateDetails(
                        dto.Address,
                        dto.DepartureDate,
                        dto.ArrivalDate,
                        dto.OperationTypeId,
                        dto.MunicipalityId,
                        dto.Observations
                    );

                    await _repository.UpdateOperationDetailsAsync(operationEntity, userId);
                    
                    if (dto.Requester != null)
                    {
                        await _repository.UpdateRequesterAsync(existingOperation.RequesterId, dto.Requester);
                    }

                    if (dto.Responsible != null)
                    {
                        var responsibleEntity = new MilitaryEntity(dto.Responsible.PersonId);
                        await _repository.UpdateResponsibleAsync(operationId, responsibleEntity, userId);
                    }
                    if (dto.Personnel != null)
                    {
                        var militaryPersonnel = dto.Personnel
                            .Where(p => p.Role == "Personal Militar")
                            .Select(p => new MilitaryEntity(p.PersonId))
                            .ToList();

                        var volunteerPersonnel = dto.Personnel
                            .Where(p => p.Role == "Voluntario")
                            .Select(p => new VolunteerEntity(p.PersonId))
                            .ToList();

                        await _repository.UpdateAssignedPersonnelAsync(operationId, militaryPersonnel, volunteerPersonnel, userId);
                    }

                    await _unitOfWork.CommitAsync();
                    _loggingService.LogInformation($"Usuario <{userName}> actualizó la operación con Id: {operationId}.");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"Error actualizando operación: {ex.Message}");
                    throw new BusinessException("Error al actualizar la operación.");
                }
            });
        }
    }
}
