using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repository
{
    public interface IAdminRepository
    {
        void Update(Admin admin);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Admin>> GetAdminsAsync();
        Task<Admin> GetAdminByIdAsync(int id);
        Task<PublicAdminDTO> GetAdminByUsernameAsync(string username);
        Task<PictureDTO> GetPictureFromAdminAsync(string username, int pictureId);
    }
}