using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class RequesterConfiguration : IEntityTypeConfiguration<Requester>
    {
        public void Configure(EntityTypeBuilder<Requester> entity)
        {
            entity.HasKey(e => e.RequesterId).HasName("PRIMARY");
            entity.ToTable("requester");
            entity.Property(e => e.RequesterId).HasColumnName("requester_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.MobilePhone)
                .HasMaxLength(20)
                .HasColumnName("mobile_phone");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'1'")
                .HasComment("0: Eliminado, 1: Activo")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        }
    }
}