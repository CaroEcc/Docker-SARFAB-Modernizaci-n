using AutoMapper;
using Modernization_SARFAB_Backend.Application.DTOs.Personnel.VolunteerManagement;
using Modernization_SARFAB_Backend.Application.Interfaces.Personnel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modernization_SARFAB_Backend.Application.UseCases.Personnel.VolunteerManagement
{
    public class GetMedicalCheckById
    {
        private readonly IMedicalCheckupRepository _repository;
        private readonly IMapper _mapper;

        public GetMedicalCheckById(IMedicalCheckupRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<VolunteerMedicalCheckDTO> ExecuteAsync(int id)
        {
            var medicalCheckupEntity = await _repository.GetMedicalCheckupByIdAsync(id);
            return _mapper.Map<VolunteerMedicalCheckDTO>(medicalCheckupEntity);
        }

    }
}
