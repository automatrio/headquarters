using System;
using API.Data;
using API.Helpers;
using API.Models;
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
            services.Configure<CloudinaryOptions>(config.GetSection("CloudinaryOptions"));
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
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                if(env == "Development")
                {
                    connStr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgUserPass.Split(":")[0];
                    var pgPort = pgUserPass.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}";
                }

                options.UseNpgsql(connStr);
            });

            return services;
        }
    }
}