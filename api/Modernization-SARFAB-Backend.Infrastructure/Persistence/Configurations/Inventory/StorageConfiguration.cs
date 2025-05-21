using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class StorageConfiguration : IEntityTypeConfiguration<Storage>
    {
        public void Configure(EntityTypeBuilder<Storage> entity)
        {
            entity.HasKey(e => e.StorageId).HasName("PRIMARY");
            entity.ToTable("storage");
            entity.Property(e => e.StorageId).HasColumnName("storage_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        }
    }
}