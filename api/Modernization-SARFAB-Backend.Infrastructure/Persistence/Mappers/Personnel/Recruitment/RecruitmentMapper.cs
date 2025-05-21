using Modernization_SARFAB_Backend.Domain.Entities.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Mappers.Personnel.Recruitment;

public static class RecruitmentMapper
{
    public static Models.Personnel.Recruitment ToModel(this RecruitmentEntity entity) => new()
    {
        FirstName = entity.FirstName,
        LastName = entity.LastName,
        Ci = entity.Ci,
        BirthDate = entity.BirthDate,
        WantsMilitaryService = entity.WantsMilitaryService,
        Status = (sbyte)entity.Status,
        UserId = entity.UserId
    };

    public static RecruitmentEntity ToEntity(this Models.Personnel.Recruitment model) => new(
        model.RecruitmentId,
        model.FirstName,
        model.LastName,
        model.Ci,
        model.BirthDate,
        model.WantsMilitaryService,
        model.UserId,
        (RecruitmentEntity.RecruitmentStatus)model.Status!
    );
}