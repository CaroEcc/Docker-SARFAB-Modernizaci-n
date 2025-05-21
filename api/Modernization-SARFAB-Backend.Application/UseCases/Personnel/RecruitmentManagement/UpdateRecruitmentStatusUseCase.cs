using Modernization_SARFAB_Backend.Application.Exceptions;
using Modernization_SARFAB_Backend.Application.Interfaces.Common;
using Modernization_SARFAB_Backend.Application.Interfaces.Services;
using Modernization_SARFAB_Backend.Domain.Entities.Personnel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using static Modernization_SARFAB_Backend.Domain.Entities.Personnel.RecruitmentEntity;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.RecruitmentManagement
{
    public class UpdateRecruitmentStatusUseCase
    {
        private readonly IRecruitmentRepository _repository;
        private readonly ILoggingService _loggingService;

        public UpdateRecruitmentStatusUseCase(IRecruitmentRepository repository, ILoggingService loggingService)
        {
            _repository = repository;
            _loggingService = loggingService;
        }

        public async Task ExecuteAsync(int id, RecruitmentStatus status, string userName)
        {
            try
            {
                var entity = await _repository.GetRecruitmentByIdAsync(id);
                switch (status)
                {
                    case RecruitmentStatus.Qualified:
                        entity.Qualify();
                        break;
                    case RecruitmentStatus.NotQualified:
                        entity.Disqualify();
                        break;
                    case RecruitmentStatus.Registered:
                        entity.Register();
                        break;
                    default:
                        throw new BusinessException("Estado no válido");
                }
                await _repository.UpdateRecruitmentStatusAsync(entity);
                _loggingService.LogInformation($"El usuario <{userName}> actualizó el estado del reclutamiento con Id: {id} a estado: {entity.Status}");
            }
            catch (BusinessException) { throw; }
            catch (Exception)
            {
                throw new BusinessException("Error al actualizar estado");
            }
        }
    }
}
