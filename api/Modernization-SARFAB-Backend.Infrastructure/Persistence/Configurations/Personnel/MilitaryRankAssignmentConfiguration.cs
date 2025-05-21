using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MilitaryRankAssignmentConfiguration : IEntityTypeConfiguration<MilitaryRankAssignment>
    {
        public void Configure(EntityTypeBuilder<MilitaryRankAssignment> entity)
        {
            entity.HasKey(e => e.AssignmentId).HasName("PRIMARY");
            entity.ToTable("military_rank_assignment");
            entity.HasIndex(e => e.RankId, "rank_id");
            entity.HasIndex(e => e.MilitaryId, "unique_military").IsUnique();
            entity.Property(e => e.AssignmentId).HasColumnName("assignment_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.MilitaryId).HasColumnName("military_id");
            entity.Property(e => e.RankId).HasColumnName("rank_id");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Military).WithOne(p => p.MilitaryRankAssignment)
                .HasForeignKey<MilitaryRankAssignment>(d => d.MilitaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("military_rank_assignment_ibfk_1");
            entity.HasOne(d => d.Rank).WithMany(p => p.MilitaryRankAssignments)
                .HasForeignKey(d => d.RankId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("military_rank_assignment_ibfk_2");
        }
    }
}