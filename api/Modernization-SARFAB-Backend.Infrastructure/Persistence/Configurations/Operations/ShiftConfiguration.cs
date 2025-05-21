using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
    {
        public void Configure(EntityTypeBuilder<Shift> entity)
        {
            entity.HasKey(e => e.ShiftId).HasName("PRIMARY");
            entity.ToTable("shift");
            entity.Property(e => e.ShiftId).HasColumnName("shift_id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        }
    }
}