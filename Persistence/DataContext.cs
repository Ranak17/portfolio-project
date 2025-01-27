﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
            
        public virtual DbSet<PlannedActivity> Activities { get; set; }
        public virtual DbSet<ActivityAttendee> ActivityAttendees { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserID, aa.ActivityID }));
            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.PlannedActivities)
                .HasForeignKey(aa => aa.AppUserID);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.PlannedActivity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa=>aa.ActivityID);
        }

    }
}
