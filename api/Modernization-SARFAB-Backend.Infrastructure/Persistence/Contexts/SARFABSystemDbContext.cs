using Microsoft.EntityFrameworkCore;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Medical;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Operations;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Contexts;

public partial class SARFABSystemDbContext : DbContext
{
    public SARFABSystemDbContext()
    {
    }

    public SARFABSystemDbContext(DbContextOptions<SARFABSystemDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<DemeritPoint> DemeritPoints { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Guard> Guards { get; set; }

    public virtual DbSet<InventoryMovement> InventoryMovements { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<MedicalCheckup> MedicalCheckups { get; set; }

    public virtual DbSet<MedicalTreatment> MedicalTreatments { get; set; }

    public virtual DbSet<Military> Militaries { get; set; }

    public virtual DbSet<MilitaryRank> MilitaryRanks { get; set; }

    public virtual DbSet<MilitaryRankAssignment> MilitaryRankAssignments { get; set; }

    public virtual DbSet<MovementDetail> MovementDetails { get; set; }

    public virtual DbSet<Municipality> Municipalities { get; set; }

    public virtual DbSet<OperationCategory> OperationCategories { get; set; }

    public virtual DbSet<OperationType> OperationTypes { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<PersonOperation> PersonOperations { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<Recruitment> Recruitments { get; set; }

    public virtual DbSet<Requester> Requesters { get; set; }

    public virtual DbSet<SarOperation> SarOperations { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<Storage> Storages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Volunteer> Volunteers { get; set; }

    public virtual DbSet<VolunteerCourse> VolunteerCourses { get; set; }

    public virtual DbSet<VolunteerGrade> VolunteerGrades { get; set; }

    public virtual DbSet<VolunteerGuard> VolunteerGuards { get; set; }
    public virtual DbSet<VolunteerInventoryTracking> VolunteerInventoryTrackings { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb3_unicode_ci")
            .HasCharSet("utf8mb3");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SARFABSystemDbContext).Assembly);

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
