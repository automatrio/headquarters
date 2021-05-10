using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Repository.MusicRepository
{
    public interface IMusicRepository
    {
        public Task CreateAlbumAsync(AlbumDTO albumDTO);
        public Task DeleteAlbumAsync(int albumId);
        public Task<AlbumDTO> GetAlbumByIdAsync(int albumId);
        public Task<AlbumDTO> GetAlbumByTitleAsync(string title);
        public Task<List<AlbumDTO>> GetAllAlbums();
        public Task AddMusicToAlbum(MusicDTO musicDTO);
    }
}