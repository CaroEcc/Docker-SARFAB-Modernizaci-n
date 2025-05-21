using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MilitaryConfiguration : IEntityTypeConfiguration<Military>
    {
        public void Configure(EntityTypeBuilder<Military> entity)
        {
            entity.HasKey(e => e.MilitaryId).HasName("PRIMARY");
            entity.ToTable("military");
            entity.Property(e => e.MilitaryId)
              .ValueGeneratedNever()
              .HasColumnName("military_id");
            entity.Property(e => e.CreatedAt)
              .HasDefaultValueSql("CURRENT_TIMESTAMP")
              .HasColumnType("timestamp")
              .HasColumnName("created_at");
            entity.Property(e => e.MobilePhone)
              .HasMaxLength(20)
              .HasColumnName("mobile_phone");
            entity.Property(e => e.Status)
              .HasDefaultValueSql("'1'")
              .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
              .ValueGeneratedOnAddOrUpdate()
              .HasDefaultValueSql("CURRENT_TIMESTAMP")
              .HasColumnType("timestamp")
              .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.MilitaryNavigation).WithOne(p => p.Military)
              .HasForeignKey<Military>(d => d.MilitaryId)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("military_ibfk_1");
        }
    }
}