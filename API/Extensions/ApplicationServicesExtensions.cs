using API.Data;
using API.Helpers;
using API.Repository;
using API.Repository.BlogPostRepository;
using API.Repository.CommentRepository;
using API.Repository.MediaRepository;
using API.Services;
using API.Services.PictureService;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IMediaRepository, MediaRepository>();
            services.AddScoped<IBlogPostRepository, BlogPostRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IPictureService, PictureService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection")
                    // , options => options.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
                    );
            });

            return services;
        }
    }
}