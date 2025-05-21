using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Configurations.Personnel;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> entity)
    {
        entity.ToTable("notification");

        entity.HasKey(e => e.Id).HasName("PRIMARY");

        entity.Property(e => e.Id).HasColumnName("id");
        entity.Property(e => e.VolunteerId).HasColumnName("volunteer_id");
        entity.Property(e => e.Message)
            .IsRequired()
            .HasColumnType("text")
            .HasColumnName("message");
        entity.Property(e => e.Type)
            .IsRequired()
            .HasMaxLength(50)
            .HasColumnName("type");
        entity.Property(e => e.RelatedEntityId).HasColumnName("related_entity_id");
        entity.Property(e => e.DaysBeforeExpiration).HasColumnName("days_before_expiration");
        entity.Property(e => e.WasRead)
            .HasDefaultValue(false)
            .HasColumnName("was_read");
        entity.Property(e => e.SentAt)
            .HasColumnType("datetime")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .HasColumnName("sent_at");
        entity.Property(e => e.Status)
            .HasDefaultValue((byte)1)
            .HasColumnName("status");

        entity.HasOne(d => d.Volunteer)
            .WithMany(p => p.Notifications)
            .HasForeignKey(d => d.VolunteerId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("notification_ibfk_1");
    }
}