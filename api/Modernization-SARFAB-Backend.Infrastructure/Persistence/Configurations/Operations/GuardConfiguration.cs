using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class GuardConfiguration : IEntityTypeConfiguration<Guard>
    {
        public void Configure(EntityTypeBuilder<Guard> entity)
        {
            entity.HasKey(e => e.GuardId).HasName("PRIMARY");
            entity.ToTable("guard");
            entity.HasIndex(e => e.ShiftId, "shift_id");
            entity.Property(e => e.GuardId).HasColumnName("guard_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.GuardDate).HasColumnName("guard_date");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location");
            entity.Property(e => e.Observations)
                .HasDefaultValueSql("Ninguna")
                .HasMaxLength(500)
                .HasColumnName("observations");
            entity.Property(e => e.ShiftId).HasColumnName("shift_id");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'1'")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Shift).WithMany(p => p.Guards)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("guard_ibfk_1");
        }
    }
}