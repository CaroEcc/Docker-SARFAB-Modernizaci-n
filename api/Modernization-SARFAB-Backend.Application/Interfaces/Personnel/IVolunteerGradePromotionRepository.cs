namespace Modernization_SARFAB_Backend.Application.Interfaces.Personnel
{
    public interface IVolunteerGradePromotionRepository
    {
        Task<int?> GetCurrentGradeIdAsync(int volunteerId);
        Task<int?> GetGradeIdByNameAsync(string gradeName);
        Task<string?> GetGradeNameByIdAsync(int gradeId); 
        Task UpdateGradeAsync(int volunteerId, int newGradeId);
    }
}