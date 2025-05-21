namespace Modernization_SARFAB_Backend.Domain.Entities.Personnel
{
    public class MilitaryRankEntity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        public MilitaryRankEntity(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
