using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService) : base(context)
        {
            _tokenService = tokenService;
        }
        

        [HttpPost("register")]
        public async Task<ActionResult<AdminDTO>> Register(RegisterDTO registerDTO)
        {
            if(await AdminExists(registerDTO.UserName))
            {
                return BadRequest("Username taken, please choose another.");
            }

            var hmac = new HMACSHA512();

            var admin = new Admin()
            {
                UserName = registerDTO.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(registerDTO.Password.ToByteArray()),
                PasswordSalt = hmac.Key
            };

            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            return new AdminDTO()
            {
                UserName = admin.UserName,
                Token = _tokenService.CreateToken(admin)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AdminDTO>> Login(LoginDTO loginDTO)
        {
            var loggedAdmin = await _context.Admins.SingleOrDefaultAsync(u => u.UserName == loginDTO.UserName);

            if(loggedAdmin == null) return BadRequest("Invalid username");
            
            using(var hmac = new HMACSHA512(loggedAdmin.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(loginDTO.Password.ToByteArray());

                for (int i = 0; i < loggedAdmin.PasswordHash.Length; i++)
                {
                    if(loggedAdmin.PasswordHash[i] != computedHash[i])
                    {
                        return BadRequest("Invalid password");
                    }
                }
            }

            return new AdminDTO()
            {
                UserName = loggedAdmin.UserName,
                Token = _tokenService.CreateToken(loggedAdmin)
            };
        }

        private async Task<bool> AdminExists(string username)
        {
            return await _context.Admins.AnyAsync(u => u.UserName == username.ToLower());
        }
    }
}