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
        public virtual DbSet<CustomerAddress> CustomerAddresses { get; set; }
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

            modelBuilder.Entity<CustomerAddress>(entity =>
            {
                entity.ToTable("CustomerAddress");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.BillingAppSuite).HasMaxLength(500);
                entity.Property(e => e.BillingCity).HasMaxLength(500);
                entity.Property(e => e.BillingCountry).HasMaxLength(500);
                entity.Property(e => e.BillingPostalCode).HasMaxLength(500);
                entity.Property(e => e.BillingStateProvince).HasMaxLength(500);
                entity.Property(e => e.BillingStreetAddress).HasMaxLength(500);
                entity.Property(e => e.CustomerProfileId).HasColumnName("CustomerProfileID");
                entity.Property(e => e.MailingAppSuite).HasMaxLength(500);
                entity.Property(e => e.MailingCity).HasMaxLength(500);
                entity.Property(e => e.MailingCountry).HasMaxLength(500);
                entity.Property(e => e.MailingPostalCode).HasMaxLength(500);
                entity.Property(e => e.MailingStateProvince).HasMaxLength(500);
                entity.Property(e => e.MailingStreetAddress).HasMaxLength(500);
                entity.Property(e => e.OtherShippingAppSuite).HasMaxLength(500);
                entity.Property(e => e.OtherShippingCity).HasMaxLength(500);
                entity.Property(e => e.OtherShippingCountry).HasMaxLength(500);
                entity.Property(e => e.OtherShippingPostalCode).HasMaxLength(500);
                entity.Property(e => e.OtherShippingStateProvince).HasMaxLength(500);
                entity.Property(e => e.OtherShippingStreetAddress).HasMaxLength(500);
                entity.Property(e => e.ShippingAppSuite).HasMaxLength(500);
                entity.Property(e => e.ShippingCity).HasMaxLength(500);
                entity.Property(e => e.ShippingCountry).HasMaxLength(500);
                entity.Property(e => e.ShippingPostalCode).HasMaxLength(500);
                entity.Property(e => e.ShippingStateProvince).HasMaxLength(500);
                entity.Property(e => e.ShippingStreetAddress).HasMaxLength(500);

                entity.HasOne(d => d.CustomerProfile).WithMany(p => p.CustomerAddresses)
                    .HasForeignKey(d => d.CustomerProfileId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomerAddress_CustomerProfile");
            });

            modelBuilder.Entity<CustomerProfile>(entity =>
            {
                entity.ToTable("CustomerProfile");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CtgenderId).HasColumnName("CTGenderID");
                entity.Property(e => e.CtpartyTypeId).HasColumnName("CTPartyTypeID");
                entity.Property(e => e.FirstName).IsRequired();
                entity.Property(e => e.FullName).IsRequired();
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
