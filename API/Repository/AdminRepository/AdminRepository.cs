using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AdminRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Admin> GetAdminByIdAsync(int id)
        {
            return await _context.Admins.FindAsync(id);
        }

        public async Task<PublicAdminDTO> GetAdminByUsernameAsync(string username)
        {
            return await _context.Admins
                .Where(admin => admin.UserName == username)
                .ProjectTo<PublicAdminDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Admin>> GetAdminsAsync()
        {
            return await _context.Admins
                .ToListAsync();
            
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Admin admin)
        {
            // adds a flag to let EF know this entity has been modified
            _context.Entry(admin).State = EntityState.Modified;
        }

        public async Task<PictureDTO> GetPictureFromAdminAsync(string username, int PictureId)
        {
            var admin = await GetAdminByUsernameAsync(username);
            return admin.Pictures.First(Picture => Picture.Id == PictureId);
        }
    }
}