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
        public virtual DbSet<CustomerProfile> CustomerProfiles { get; set; }
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
                entity.Property(e => e.Code).HasMaxLength(30);
                entity.Property(e => e.Ctid).HasColumnName("CTID");
                entity.Property(e => e.Keys).HasMaxLength(4);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<CustomerProfile>(entity =>
            {
                entity.ToTable("CustomerProfile");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.BussinessEmail).HasMaxLength(500);
                entity.Property(e => e.BussinessName).HasMaxLength(200);
                entity.Property(e => e.BussinessPhNo).HasMaxLength(500);
                entity.Property(e => e.CtgenderId).HasColumnName("CTGenderID");
                entity.Property(e => e.EmailAddress).HasMaxLength(500);
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(200);
                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(200);
                entity.Property(e => e.HomePhNo).HasMaxLength(500);
                entity.Property(e => e.LastName).HasMaxLength(200);
                entity.Property(e => e.MiddleName).HasMaxLength(200);
                entity.Property(e => e.MobilePhNo).HasMaxLength(500);
                entity.Property(e => e.PersonalEmail).HasMaxLength(500);
                entity.Property(e => e.PhoneNumber).HasMaxLength(500);
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
