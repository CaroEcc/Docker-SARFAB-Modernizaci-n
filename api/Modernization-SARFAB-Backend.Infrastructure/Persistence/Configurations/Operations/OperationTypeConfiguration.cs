using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class OperationTypeConfiguration : IEntityTypeConfiguration<OperationType>
    {
        public void Configure(EntityTypeBuilder<OperationType> entity)
        {
            entity.HasKey(e => e.OperationTypeId).HasName("PRIMARY");
            entity.ToTable("operation_type");
            entity.HasIndex(e => e.OperationCategoryId, "operation_category_id");
            entity.Property(e => e.OperationTypeId).HasColumnName("operation_type_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.OperationCategoryId).HasColumnName("operation_category_id");
            entity.HasOne(d => d.OperationCategory).WithMany(p => p.OperationTypes)
                .HasForeignKey(d => d.OperationCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("operation_type_ibfk_1");
        }
    }
}