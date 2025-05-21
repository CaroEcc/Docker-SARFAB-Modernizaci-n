using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class DemeritPointConfiguration : IEntityTypeConfiguration<DemeritPoint>
    {
        public void Configure(EntityTypeBuilder<DemeritPoint> entity)
        {
            entity.HasKey(e => e.DemeritId).HasName("PRIMARY");
            entity.ToTable("demerit_points");
            entity.HasIndex(e => e.VolunteerId, "volunteer_id");
            entity.Property(e => e.DemeritId).HasColumnName("demerit_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Observation)
                .HasMaxLength(500)
                .HasColumnName("observation");
            entity.Property(e => e.PointsLost)
                .HasDefaultValue(2)
                .HasColumnName("points_lost");
            entity.Property(e => e.Reason)
                .HasMaxLength(300)
                .HasComment("Falta_Guardia, Falta_Operativo")
                .HasColumnName("reason");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
            entity.HasOne(d => d.Volunteer).WithMany(p => p.DemeritPoints)
                .HasForeignKey(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("demerit_points_ibfk_1");
        }
    }
}