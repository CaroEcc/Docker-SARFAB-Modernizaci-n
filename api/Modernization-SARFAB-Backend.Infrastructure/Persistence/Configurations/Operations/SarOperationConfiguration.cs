using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class SarOperationConfiguration : IEntityTypeConfiguration<SarOperation>
    {
        public void Configure(EntityTypeBuilder<SarOperation> entity)
        {
            entity.HasKey(e => e.OperationId).HasName("PRIMARY");
            entity.ToTable("sar_operation");
            entity.HasIndex(e => e.MunicipalityId, "municipality_id");
            entity.HasIndex(e => e.OperationTypeId, "operation_type_id");
            entity.HasIndex(e => e.RequesterId, "requester_id");
            entity.Property(e => e.OperationId).HasColumnName("operation_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Observations)
                .HasMaxLength(500)
                .HasDefaultValueSql("Ninguna")
                .HasColumnName("observations");
            entity.Property(e => e.ArrivalDate)
                .HasColumnType("datetime")
                .HasColumnName("arrival_date");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.DepartureDate)
                .HasColumnType("datetime")
                .HasColumnName("departure_date");
            entity.Property(e => e.MunicipalityId).HasColumnName("municipality_id");
            entity.Property(e => e.OperationTypeId).HasColumnName("operation_type_id");
            entity.Property(e => e.RequesterId).HasColumnName("requester_id");
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
            entity.HasOne(d => d.Municipality).WithMany(p => p.SarOperations)
                .HasForeignKey(d => d.MunicipalityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("sar_operation_ibfk_2");
            entity.HasOne(d => d.OperationType).WithMany(p => p.SarOperations)
                .HasForeignKey(d => d.OperationTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("sar_operation_ibfk_1");
            entity.HasOne(d => d.Requester).WithMany(p => p.SarOperations)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("sar_operation_ibfk_3");
        }
    }
}