using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Project.WebAPI.Extensions;
using Project.WebAPI.Middleware;

namespace Project.WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers(opt =>
            {
                AuthorizationPolicy policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
            builder.Services.AddApplicationServices(builder.Configuration);
            builder.Services.AddIdentityService(builder.Configuration);
            WebApplication app = builder.Build();
            //app.UseHttpsRedirection();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseCors("CORSPolicyForPortfolioProject");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            using IServiceScope scope = app.Services.CreateScope();
            IServiceProvider services = scope.ServiceProvider;
            try
            {
                DataContext context = services.GetRequiredService<DataContext>();
                UserManager<AppUser> userManager = services.GetRequiredService<UserManager<AppUser>>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context,userManager);
            }
            catch (Exception ex)
            {
                ILogger logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An Error occured during Migration");
            }
            app.Run();

        }
    }
}
