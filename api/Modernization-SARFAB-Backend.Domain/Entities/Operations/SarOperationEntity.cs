using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Operations
{
    public class SarOperationEntity
    {
        public int OperationId { get; private set; }
        public string Address { get; private set; }
        public DateTime DepartureDate { get; private set; }
        public DateTime? ArrivalDate { get; private set; }
        public string? Observations { get; private set; }
        public int OperationTypeId { get; private set; }
        public int MunicipalityId { get; private set; }
        public int RequesterId { get; private set; }
        public OperationStatus Status { get; private set; }
        public short? UserId { get; private set; }
        public DateTime? UpdatedAt { get; private set; }

        public SarOperationEntity(
            
            string address,
            DateTime departureDate,
            int operationTypeId,
            int municipalityId,
            int requesterId,
            DateTime? arrivalDate = null,
            short? userId = null)
        {
            if (arrivalDate.HasValue && arrivalDate < departureDate)
                throw new DomainException("La fecha de llegada no puede ser menor a la fecha de salida.");


            Address = address;
            DepartureDate = departureDate;
            ArrivalDate = arrivalDate;
            OperationTypeId = operationTypeId;
            MunicipalityId = municipalityId;
            RequesterId = requesterId;
            UserId = userId;
            Status = OperationStatus.Active;
            Observations = "Ninguna";
        }
        
        public SarOperationEntity(
            int operationId,
            string address,
            DateTime departureDate,
            int operationTypeId,
            int municipalityId,
            int requesterId,
            DateTime? arrivalDate = null,
            short? userId = null)
            : this(address, departureDate, operationTypeId, municipalityId, requesterId, arrivalDate, userId)
        {
            OperationId = operationId; 
        }
        
        public SarOperationEntity(int operationId, OperationStatus status)
        {
            OperationId = operationId;
            Status = status;
        }
        public void UpdateDetails(
            string? newAddress,
            DateTime? newDepartureDate,
            DateTime? newArrivalDate,
            int? newOperationTypeId,
            int? newMunicipalityId,
            string? newObservation)
        {
            Address = string.IsNullOrWhiteSpace(newAddress) ? Address : newAddress;
            DepartureDate = newDepartureDate ?? DepartureDate;
            ArrivalDate = newArrivalDate ?? ArrivalDate;
            OperationTypeId = newOperationTypeId ?? OperationTypeId;
            MunicipalityId = newMunicipalityId ?? MunicipalityId;
            Observations = string.IsNullOrWhiteSpace(newObservation) ? Observations : newObservation;

            if (newDepartureDate.HasValue && newArrivalDate.HasValue)
            {
                if (newArrivalDate < newDepartureDate)
                    throw new DomainException("La fecha de llegada no puede ser menor a la fecha de salida.");
            }
            else if (newArrivalDate.HasValue && newArrivalDate < DepartureDate)
            {
                throw new DomainException("La fecha de llegada no puede ser menor a la fecha de salida.");
            }

        }
        public void SetObservations(string observations) => Observations = observations;
        
        public enum OperationStatus
        {
            Deleted = 0,
            Active = 1
        }
    }
}