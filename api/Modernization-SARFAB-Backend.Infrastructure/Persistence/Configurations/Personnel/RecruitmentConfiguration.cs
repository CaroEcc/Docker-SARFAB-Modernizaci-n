using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations.Personnel
{
  public class RecruitmentConfiguration : IEntityTypeConfiguration<Recruitment>
  {
    public void Configure(EntityTypeBuilder<Recruitment> entity)
    {
            entity.HasKey(e => e.RecruitmentId).HasName("PRIMARY");

            entity.ToTable("recruitment");

            entity.Property(e => e.RecruitmentId).HasColumnName("recruitment_id");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.Ci)
                .HasMaxLength(20)
                .HasColumnName("ci");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'1'")
                .HasComment("0: No apto, 1: En proceso, 2: Apto")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WantsMilitaryService).HasColumnName("wants_military_service");
        }
  }
}
