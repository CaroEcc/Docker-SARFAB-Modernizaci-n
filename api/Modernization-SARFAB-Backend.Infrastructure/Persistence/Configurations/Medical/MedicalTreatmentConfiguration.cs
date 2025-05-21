using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Medical;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations
{
    public class MedicalTreatmentConfiguration : IEntityTypeConfiguration<MedicalTreatment>
    {
        public void Configure(EntityTypeBuilder<MedicalTreatment> entity)
        {
            entity.HasKey(e => e.TreatmentId).HasName("PRIMARY");
            entity.ToTable("medical_treatment");
            entity.HasIndex(e => e.AttendingPersonId, "attending_person_id");
            entity.HasIndex(e => e.PatientPersonId, "patient_person_id");
            entity.Property(e => e.TreatmentId).HasColumnName("treatment_id");
            entity.Property(e => e.AttendingPersonId).HasColumnName("attending_person_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.Diagnosis)
                .HasMaxLength(500)
                .HasColumnName("diagnosis");
            entity.Property(e => e.PatientPersonId).HasColumnName("patient_person_id");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'1'")
                .HasColumnName("status");
            entity.Property(e => e.TreatmentDate)
                .HasColumnType("datetime")
                .HasColumnName("treatment_date");
            entity.Property(e => e.TreatmentDescription)
                .HasMaxLength(500)
                .HasColumnName("treatment_description");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.AttendingPerson).WithMany(p => p.MedicalTreatmentAttendingPeople)
                .HasForeignKey(d => d.AttendingPersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medical_treatment_ibfk_1");
            entity.HasOne(d => d.PatientPerson).WithMany(p => p.MedicalTreatmentPatientPeople)
                .HasForeignKey(d => d.PatientPersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medical_treatment_ibfk_2");
        }
    }
}