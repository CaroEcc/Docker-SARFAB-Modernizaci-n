using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class OperationCategoryConfiguration : IEntityTypeConfiguration<OperationCategory>
    {
        public void Configure(EntityTypeBuilder<OperationCategory> entity)
        {
            entity.HasKey(e => e.OperationCategoryId).HasName("PRIMARY");
            entity.ToTable("operation_category");
            entity.Property(e => e.OperationCategoryId).HasColumnName("operation_category_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        }
    }
}