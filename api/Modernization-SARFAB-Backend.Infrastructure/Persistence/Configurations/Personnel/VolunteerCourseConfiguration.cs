using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class VolunteerCourseConfiguration : IEntityTypeConfiguration<VolunteerCourse>
    {
        public void Configure(EntityTypeBuilder<VolunteerCourse> entity)
        {
            entity.HasKey(e => new { e.VolunteerId, e.CourseId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
            entity.ToTable("volunteer_course");
            entity.HasIndex(e => e.CourseId, "course_id");
            entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CompletionDate).HasColumnName("completion_date");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.Course).WithMany(p => p.VolunteerCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_course_ibfk_2");
            entity.HasOne(d => d.Volunteer).WithMany(p => p.VolunteerCourses)
                .HasForeignKey(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_course_ibfk_1");
        }
    }
}