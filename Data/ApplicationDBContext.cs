using CRM.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CRM.Data
{
    public partial class ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : IdentityDbContext<ApplicationUser>(options)
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<CommonType> CommonTypes { get; set; }
        public virtual DbSet<SystemConfiguration> SystemConfigurations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity configuration is applied

            modelBuilder.Entity<Case>(entity =>
            {
                entity.ToTable("Case");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CtpriorityId).HasColumnName("CTPriorityID");
                entity.Property(e => e.CtstatusId).HasColumnName("CTStatusID");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
                entity.Property(e => e.IssueDescripition).IsRequired();
            });

            modelBuilder.Entity<CommonType>(entity =>
            {
                entity.ToTable("CommonType");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Code).HasMaxLength(10);
                entity.Property(e => e.Ctid).HasColumnName("CTID");
                entity.Property(e => e.Keys).HasMaxLength(4);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<SystemConfiguration>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__SystemCo__3214EC27314DFBF9");

                entity.ToTable("SystemConfiguration");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Field)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        // Declare partial method
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
