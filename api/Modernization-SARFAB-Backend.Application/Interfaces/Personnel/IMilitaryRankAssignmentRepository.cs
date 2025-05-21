namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IMilitaryRankAssignmentRepository
    {
        Task PromoteAsync(int militaryId);
    }
}
