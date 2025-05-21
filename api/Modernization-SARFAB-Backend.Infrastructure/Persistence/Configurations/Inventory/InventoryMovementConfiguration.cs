using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class InventoryMovementConfiguration : IEntityTypeConfiguration<InventoryMovement>
    {
        public void Configure(EntityTypeBuilder<InventoryMovement> entity)
        {
            entity.HasKey(e => e.MovementId).HasName("PRIMARY");
            entity.ToTable("inventory_movement");
            entity.HasIndex(e => e.PersonId, "person_id");
            entity.HasIndex(e => e.StorageId, "storage_id");
            entity.Property(e => e.MovementId).HasColumnName("movement_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.MovementDate)
                .HasColumnType("datetime")
                .HasColumnName("movement_date");
            entity.Property(e => e.PersonId).HasColumnName("person_id");
            entity.Property(e => e.StorageId).HasColumnName("storage_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Person).WithMany(p => p.InventoryMovements)
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inventory_movement_ibfk_1");
            entity.HasOne(d => d.Storage).WithMany(p => p.InventoryMovements)
                .HasForeignKey(d => d.StorageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inventory_movement_ibfk_2");
        }
    }
}