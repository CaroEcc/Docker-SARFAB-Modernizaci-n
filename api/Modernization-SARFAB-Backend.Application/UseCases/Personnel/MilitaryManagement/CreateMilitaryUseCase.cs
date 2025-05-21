using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class CreateMilitaryUseCase
    {
        private readonly IMilitaryRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public CreateMilitaryUseCase(
            IMilitaryRepository repository,
            IUnitOfWork unitOfWork,
            ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(CreateMilitaryDTO dto, short userId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();

                var entity = new MilitaryEntity(
                    new PersonEntity(dto.FirstName, dto.LastName),
                    dto.MobilePhone,
                    userId
                );

                var militaryId = await _repository.CreateMilitaryAsync(entity, dto.MilitaryRankId);
                
                await _unitOfWork.CommitAsync();

                _loggingService.LogInformation($"Usuario <{userName}> registró militar con Id: {militaryId} y rango asignado: {dto.MilitaryRankId}.");
            });
        }
    }
}