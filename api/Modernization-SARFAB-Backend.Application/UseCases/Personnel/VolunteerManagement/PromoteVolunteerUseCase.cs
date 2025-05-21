using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Inventory;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class PromoteVolunteerUseCase
    {
        private readonly IVolunteerGradePromotionRepository _repository;
        private readonly ILoggingService _loggingService;
        private static readonly List<string> VolunteerGrades = new()
        {
            "1er Año", "2do Año", "3er Año", "Rescatista"
        };
        private readonly IItemRepository _itemRepository;

        public PromoteVolunteerUseCase(IVolunteerGradePromotionRepository repository, ILoggingService loggingService, IItemRepository itemRepository)
        {
            _repository = repository;
            _loggingService = loggingService;
            _itemRepository = itemRepository;
        }

        public async Task ExecuteAsync(int volunteerId, string userName)
        {
            var pendingItems = await _itemRepository.GetItemsOwedByVolunteerAsync(volunteerId);
            if (pendingItems.Any())
                throw new BusinessException("No se puede ascender al voluntario porque tiene elementos pendientes de devolución.");
            var currentGradeId = await _repository.GetCurrentGradeIdAsync(volunteerId);
            if (currentGradeId == null)
                throw new BusinessException("Asignación de grado no encontrada.");

            var currentGradeName = await _repository.GetGradeNameByIdAsync(currentGradeId.Value);
            if (currentGradeName == null)
                throw new BusinessException("Grado actual no encontrado.");

            var currentGradeIndex = VolunteerGrades.IndexOf(currentGradeName);
            if (currentGradeIndex == -1 || currentGradeIndex == VolunteerGrades.Count - 1)
                throw new BusinessException("No hay un grado superior disponible.");

            var nextGradeName = VolunteerGrades[currentGradeIndex + 1];
            var nextGradeId = await _repository.GetGradeIdByNameAsync(nextGradeName);
            if (nextGradeId == null)
                throw new BusinessException("El siguiente grado no está registrado en la base de datos.");

            await _repository.UpdateGradeAsync(volunteerId, nextGradeId.Value);
            _loggingService.LogInformation($"Usuario <{userName}> ascendió voluntario con Id: {volunteerId}.");
        }
    }
}
