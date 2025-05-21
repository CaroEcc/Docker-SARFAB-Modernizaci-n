using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MilitaryRankConfiguration : IEntityTypeConfiguration<MilitaryRank>
    {
        public void Configure(EntityTypeBuilder<MilitaryRank> entity)
        {
            entity.HasKey(e => e.RankId).HasName("PRIMARY");
            entity.ToTable("military_rank");
            entity.Property(e => e.RankId).HasColumnName("rank_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Abbreviation)
                .HasMaxLength(10)
                .HasColumnName("abbreviation");
        }
    }
}