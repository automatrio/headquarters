using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServicesExtensions
    {
        public static IServiceCollection AddAuthenticationServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(config["TokenKey"].ToByteArray()),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                })
                .AddGoogle("Google", options =>
                {
                    var googleAuth = config.GetSection("Authentication:Google");

                    options.ClientId = googleAuth["ClientId"];
                    options.ClientSecret = googleAuth["ClientSecret"];
                    options.SignInScheme = IdentityConstants.ExternalScheme; // used to identify external schemes
                });

            return services;
        }
    }
}