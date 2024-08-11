using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Project.WebAPI.Extensions
{
    public static class StartupExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration configuration) {
            services.AddAuthorization();
            services.AddCors(option =>
            {
                option.AddPolicy("CORSPolicyForPortfolioProject", builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.WithOrigins(new string[]{ "http://localhost:3000" });
                });
            });
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CustomList.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor,UserAccessor>();
            return services;
        }
    }
}
