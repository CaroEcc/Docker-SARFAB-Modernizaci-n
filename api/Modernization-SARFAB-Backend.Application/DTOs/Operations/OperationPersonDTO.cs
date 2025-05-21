namespace Modernization_SARFAB_Backend.Application.DTOs.Operations;

public class OperationPersonDTO
{
    public int PersonId { get; set; }
    // Ejemplo de roles: "Responsable", "Voluntario", "Personal Militar"
    public string Role { get; set; }
}