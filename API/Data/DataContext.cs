using System.Diagnostics.CodeAnalysis;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Album> Albums { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Media>()
                .HasDiscriminator(media => media.TypeDiscriminator)
                .HasValue<Music>(MediaType.Music)
                .HasValue<Model3D>(MediaType.Model3D)
                .HasValue<Picture>(MediaType.Picture);

            // builder.Entity<Media>().ToTable("Media");
            // base.OnModelCreating(builder);
        }

    }
}