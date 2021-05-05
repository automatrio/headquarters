using Amazon.S3;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class AWSServicesExtensions
    {
        public static IServiceCollection AddAWSServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDefaultAWSOptions(config.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            return services;
        }
    }
}