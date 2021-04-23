
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using Site.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Site.Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            var posts = new List<BlogPost>{
                new BlogPost{
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    Title = "Test title #1",
                    Content = "Test content #1",
                    ImagePaths = ""
                },
                new BlogPost{
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now.AddDays(1),
                    Title = "Test title #2",
                    Content = "Test content #2",
                    ImagePaths = ""
                },
                new BlogPost{
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now.AddDays(2),
                    Title = "Test title #3",
                    Content = "Test content #3",
                    ImagePaths = ""
                }
            };

            modelBuilder.Entity<BlogPost>().HasData(posts);
        }
    }
}