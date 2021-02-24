using API.Entities;

namespace API.Services
{
    public interface ITokenService
    {
        public string CreateToken(Admin admin);
    }
}