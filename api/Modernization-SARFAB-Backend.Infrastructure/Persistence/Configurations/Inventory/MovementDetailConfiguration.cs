using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MovementDetailConfiguration : IEntityTypeConfiguration<MovementDetail>
    {
        public void Configure(EntityTypeBuilder<MovementDetail> entity)
        {
            entity.HasKey(e => new { e.MovementId, e.ItemId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
            entity.ToTable("movement_detail");
            entity.HasIndex(e => e.ItemId, "item_id");
            entity.Property(e => e.MovementId).HasColumnName("movement_id");
            entity.Property(e => e.ItemId).HasColumnName("item_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.MovementType)
                .HasComment("0: Salida, 1: Devolución")
                .HasColumnName("movement_type");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Item).WithMany(p => p.MovementDetails)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("movement_detail_ibfk_2");
            entity.HasOne(d => d.Movement).WithMany(p => p.MovementDetails)
                .HasForeignKey(d => d.MovementId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("movement_detail_ibfk_1");
        }
    }
}