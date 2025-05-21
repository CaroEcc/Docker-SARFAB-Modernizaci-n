using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.MilitaryManagement
{
    public class PromoteMilitaryUseCase
    {
        private readonly IMilitaryRankAssignmentRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILoggingService _loggingService;

        public PromoteMilitaryUseCase(
            IMilitaryRankAssignmentRepository repository, 
            IUnitOfWork unitOfWork, 
            ILoggingService loggingService)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int militaryId, string userName)
        {
            await _unitOfWork.ExecuteWithStrategyAsync(async () =>
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    await _repository.PromoteAsync(militaryId);
                    await _unitOfWork.CommitAsync();

                    _loggingService.LogInformation($"Usuario <{userName}> ascendió militar con Id: {militaryId}.");
                }
                catch (Exception ex)
                {
                    await _unitOfWork.RollbackAsync();
                    _loggingService.LogError($"ERROR AL ASCENDER MILITAR: {ex.Message}");
                    throw;
                }
            });
        }
    }
}