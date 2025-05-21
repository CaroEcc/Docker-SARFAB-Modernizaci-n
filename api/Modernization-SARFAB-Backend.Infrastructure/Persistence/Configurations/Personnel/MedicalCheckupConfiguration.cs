using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MedicalCheckupConfiguration : IEntityTypeConfiguration<MedicalCheckup>
    {
        public void Configure(EntityTypeBuilder<MedicalCheckup> entity)
        {
            entity.HasKey(e => e.CheckupId).HasName("PRIMARY");
            entity.ToTable("medical_checkup");
            entity.HasIndex(e => e.VolunteerId, "volunteer_id");
            entity.Property(e => e.CheckupId).HasColumnName("checkup_id");
            entity.Property(e => e.CheckupDate).HasColumnName("checkup_date");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpirationDate).HasColumnName("expiration_date");
            entity.Property(e => e.Observations)
                .HasMaxLength(500)
                .HasColumnName("observations");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
            entity.HasOne(d => d.Volunteer).WithMany(p => p.MedicalCheckups)
                .HasForeignKey(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medical_checkup_ibfk_1");
        }
    }
}