namespace Modernization_SARFAB_Backend.Domain.Entities.Operations;

public class PersonOperationEntity
{
    public int PersonId { get; set; }

    public int OperationId { get; set; }
    
    public byte Status { get; set; } = 0;

}