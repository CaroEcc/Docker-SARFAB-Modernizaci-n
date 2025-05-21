using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations.Inventory
{
    public class VolunteerInventoryTrackingConfiguration : IEntityTypeConfiguration<VolunteerInventoryTracking>
    {
        public void Configure(EntityTypeBuilder<VolunteerInventoryTracking> entity)
        {
            // Configuración de la llave primaria compuesta
            entity.HasKey(e => new { e.PersonId, e.ItemId });

            entity.ToTable("volunteer_inventory_tracking");

            entity.Property(e => e.PersonId).HasColumnName("person_id");
            entity.Property(e => e.ItemId).HasColumnName("item_id");
            entity.Property(e => e.PendingAmount).HasColumnName("pending_amount");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("timestamp")
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Relaciones
            entity.HasOne(e => e.Person)
                .WithMany(p => p.VolunteerInventoryTrackings)
                .HasForeignKey(e => e.PersonId)
                .HasConstraintName("fk_vit_person");

            entity.HasOne(e => e.Item)
                .WithMany(i => i.VolunteerInventoryTrackings)
                .HasForeignKey(e => e.ItemId)
                .HasConstraintName("fk_vit_item");
        }
    }
}
