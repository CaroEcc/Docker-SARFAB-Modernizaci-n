using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MunicipalityConfiguration : IEntityTypeConfiguration<Municipality>
    {
        public void Configure(EntityTypeBuilder<Municipality> entity)
        {
            entity.HasKey(e => e.MunicipalityId).HasName("PRIMARY");
            entity.ToTable("municipality");
            entity.HasIndex(e => e.ProvinceId, "province_id");
            entity.Property(e => e.MunicipalityId).HasColumnName("municipality_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.ProvinceId).HasColumnName("province_id");
            entity.HasOne(d => d.Province).WithMany(p => p.Municipalities)
                .HasForeignKey(d => d.ProvinceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("municipality_ibfk_1");
        }
    }
}