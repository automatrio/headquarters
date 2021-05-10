using API.Data;
using API.Helpers;
using API.Repository;
using API.Repository.BlogPostRepository;
using API.Repository.CommentRepository;
using API.Repository.MusicRepository;
using API.Repository.PictureRepository;
using API.Services;
using API.Services.AWS.S3Service;
using API.Services.GoogleDriveService;
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
            services.AddScoped<IBlogPostRepository, BlogPostRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IPictureService, PictureService>();
            services.AddScoped<IPictureRepository, PictureRepository>();
            services.AddScoped<IMusicRepository, MusicRepository>();
            // implement AWS or Drive Service toggle
            // services.AddScoped<IStorageService, S3Service>();
            services.AddScoped<IStorageService, GoogleDriveService>();

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