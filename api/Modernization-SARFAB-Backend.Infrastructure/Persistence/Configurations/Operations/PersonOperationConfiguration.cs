using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class PersonOperationConfiguration : IEntityTypeConfiguration<PersonOperation>
    {
        public void Configure(EntityTypeBuilder<PersonOperation> entity)
        {
            entity.HasKey(e => new { e.PersonId, e.OperationId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
            entity.ToTable("person_operation");
            entity.HasIndex(e => e.OperationId, "operation_id");
            entity.Property(e => e.PersonId).HasColumnName("person_id");
            entity.Property(e => e.OperationId).HasColumnName("operation_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .HasComment("Encargado, Voluntario")
                .HasColumnName("role");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Operation).WithMany(p => p.PersonOperations)
                .HasForeignKey(d => d.OperationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("person_operation_ibfk_2");
            entity.HasOne(d => d.Person).WithMany(p => p.PersonOperations)
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("person_operation_ibfk_1");
        }
    }
}