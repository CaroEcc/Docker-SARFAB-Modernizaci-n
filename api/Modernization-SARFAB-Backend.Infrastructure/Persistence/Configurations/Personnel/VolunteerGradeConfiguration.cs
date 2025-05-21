using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class VolunteerGradeConfiguration : IEntityTypeConfiguration<VolunteerGrade>
    {
        public void Configure(EntityTypeBuilder<VolunteerGrade> entity)
        {
            entity.HasKey(e => e.VolunteerGradeId).HasName("PRIMARY");
            entity.ToTable("volunteer_grade");
            entity.HasIndex(e => e.GradeId, "grade_id");
            entity.HasIndex(e => e.VolunteerId, "unique_volunteer").IsUnique();
            entity.Property(e => e.VolunteerGradeId).HasColumnName("volunteer_grade_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.GradeId).HasColumnName("grade_id");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
            entity.HasOne(d => d.Grade).WithMany(p => p.VolunteerGrades)
                .HasForeignKey(d => d.GradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_grade_ibfk_2");
            entity.HasOne(d => d.Volunteer).WithOne(p => p.VolunteerGrade)
                .HasForeignKey<VolunteerGrade>(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_grade_ibfk_1");
        }
    }
}