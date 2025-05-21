using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class VolunteerConfiguration : IEntityTypeConfiguration<Volunteer>
    {
        public void Configure(EntityTypeBuilder<Volunteer> entity)
        {
            entity.HasKey(e => e.VolunteerId).HasName("PRIMARY");
            entity.ToTable("volunteer");
            entity.HasIndex(e => e.Ci, "ci").IsUnique();
            entity.HasIndex(e => e.Email, "email").IsUnique();
            entity.HasIndex(e => e.DepartmentId, "department_id");
            entity.Property(e => e.VolunteerId)
                .ValueGeneratedOnAdd()
                .HasColumnName("volunteer_id");
            entity.Property(e => e.Allergies)
                .HasMaxLength(500)
                .HasColumnName("allergies");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.BloodType)
                .HasMaxLength(10)
                .HasColumnName("blood_type");
            entity.Property(e => e.Ci)
                .HasMaxLength(20)
                .HasColumnName("ci");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.DepartmentId).HasColumnName("department_id");
            entity.Property(e => e.DischargeReason)
                .HasMaxLength(500)
                .HasColumnName("discharge_reason");
            entity.Property(e => e.DistinctiveFeatures)
                .HasMaxLength(500)
                .HasColumnName("distinctive_features");
            entity.Property(e => e.EmergencyContactAddress)
                .HasMaxLength(255)
                .HasColumnName("emergency_contact_address");
            entity.Property(e => e.EmergencyContactFullName)
                .HasMaxLength(255)
                .HasColumnName("emergency_contact_full_name");
            entity.Property(e => e.EmergencyContactMobile)
                .HasMaxLength(20)
                .HasColumnName("emergency_contact_mobile");
            entity.Property(e => e.EmergencyContactPhone)
                .HasMaxLength(20)
                .HasColumnName("emergency_contact_phone");
            entity.Property(e => e.EmergencyContactRelation)
                .HasMaxLength(100)
                .HasColumnName("emergency_contact_relation");
            entity.Property(e => e.HomeAddress)
                .HasMaxLength(255)
                .HasColumnName("home_address");
            entity.Property(e => e.MobilePhone)
                .HasMaxLength(20)
                .HasColumnName("mobile_phone");
            entity.Property(e => e.Occupation)
                .HasMaxLength(100)
                .HasColumnName("occupation");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.Religion)
                .HasMaxLength(100)
                .HasColumnName("religion");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'1'")
                .HasComment("0: Eliminado, 1: Activo, 2: Servicio Cumplido, 3: Baja")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VolunteerType)
                .HasMaxLength(50)
                .HasComment("Voluntario, Libretista")
                .HasColumnName("volunteer_type");
            entity.HasOne(d => d.Department).WithMany(p => p.Volunteers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("volunteer_ibfk_2");
            entity.HasOne(d => d.VolunteerNavigation).WithOne(p => p.Volunteer)
                .HasForeignKey<Volunteer>(d => d.VolunteerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("volunteer_ibfk_1");
        }
    }
}