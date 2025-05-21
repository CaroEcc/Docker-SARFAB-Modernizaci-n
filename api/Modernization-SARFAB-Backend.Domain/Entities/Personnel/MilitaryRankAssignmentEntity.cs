namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class MilitaryRankAssignmentEntity
    {
        public int Id { get; private set; }
        public int MilitaryId { get; private set; }
        public int RankId { get; private set; }
        public short? UserId { get; private set; }

        public MilitaryRankAssignmentEntity(int militaryId, int rankId, short userId = 0)
        {
            MilitaryId = militaryId;
            RankId = rankId;
            UserId = userId;
        }

        public void Promote(int newRankId)
        {
            RankId = newRankId;
        }

    }

}
