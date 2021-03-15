using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(await context.Admins.AnyAsync()) return;

            var seedData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            
            var adminsData = JsonSerializer.Deserialize<List<Admin>>(seedData);

            foreach(var admin in adminsData)
            {
                using var hmac = new HMACSHA512();
                
                admin.PasswordHash = hmac.ComputeHash("test".ToByteArray());
                admin.PasswordSalt = hmac.Key;

                context.Admins.Add(admin);
            }

            await context.SaveChangesAsync();
        } 
    }
}