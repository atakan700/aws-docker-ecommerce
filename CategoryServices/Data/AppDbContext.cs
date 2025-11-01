using Microsoft.EntityFrameworkCore;
using CategoryServices.Models;
using System.Collections.Generic;

namespace CategoryServices.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Category> Kategoriler { get; set; }

        public DbSet<SubCategory> SubCategory { get; set; }
    }
}
