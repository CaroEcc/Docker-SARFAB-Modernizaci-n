using Modernization_SARFAB_Backend.Application.DTOs.Personnel.MilitaryManagement;
using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class UpdateMilitaryUseCase
    {
        private readonly IMilitaryRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public UpdateMilitaryUseCase(IMilitaryRepository repository, IUnitOfWork unitOfWork, ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int id, UpdateMilitaryDTO dto, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();

                var (entity, _) = await _repository.GetMilitaryByIdAsync(id);
                if (entity == null)
                    throw new BusinessException("Militar no encontrado");

                entity.UpdateDetails(dto.FirstName, dto.LastName, dto.MobilePhone);

                await _repository.UpdateAsync(entity, dto.MilitaryRankId);

                await _unitOfWork.CommitAsync();

                _loggingService.LogInformation($"Usuario <{userName}> actualizó militar con Id: {id} y nuevo rango {dto.MilitaryRankId}.");
            });
        }
    }
}