using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class VolunteerGuardConfiguration : IEntityTypeConfiguration<VolunteerGuard>
    {
        public void Configure(EntityTypeBuilder<VolunteerGuard> entity)
        {
            entity.HasKey(e => new { e.VolunteerId, e.GuardId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
            entity.ToTable("volunteer_guard");
            entity.HasIndex(e => e.GuardId, "guard_id");
            entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
            entity.Property(e => e.GuardId).HasColumnName("guard_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .HasComment("Responsable, Voluntario")
                .HasColumnName("role");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Guard).WithMany(p => p.VolunteerGuards)
                .HasForeignKey(d => d.GuardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_guard_ibfk_2");
            entity.HasOne(d => d.Volunteer).WithMany(p => p.VolunteerGuards)
                .HasForeignKey(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_guard_ibfk_1");
        }
    }
}