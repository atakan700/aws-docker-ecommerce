using Microsoft.EntityFrameworkCore;
using ProductServices.Model;

namespace ProductServices.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Picture> Pictures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // İlişkiyi tanımla
            modelBuilder.Entity<Picture>()
                .HasKey(p => p.UrlId);

            modelBuilder.Entity<Picture>()
                .HasOne(p => p.Product)
                .WithMany(pr => pr.Pictures)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.Cascade); // Ürün silinince resimleri de sil

            modelBuilder.Entity<Picture>()
                .Property(p => p.Urls)
                .HasMaxLength(500)
                .IsRequired();
        }
    }
}
