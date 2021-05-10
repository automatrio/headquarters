using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services.AWS.S3Service;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.MusicRepository
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MusicRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        
        public async Task CreateAlbumAsync(AlbumDTO albumDTO)
        {
            var newAlbum = _mapper.Map<Album>(albumDTO);
            await _context.Albums.AddAsync(newAlbum);
        }

        public async Task DeleteAlbumAsync(int albumId)
        {
            var album = await _context.Albums.FindAsync(albumId);
            _context.Albums.Remove(album);
        }

        public async Task<AlbumDTO> GetAlbumByIdAsync(int albumId)
        {
            var album = await _context.Albums.FindAsync(albumId);

            return _mapper.Map<AlbumDTO>(album);
        }
        public async Task<AlbumDTO> GetAlbumByTitleAsync(string title)
        {
            var album = await _context.Albums.SingleOrDefaultAsync(album => album.Title == title);

            return _mapper.Map<AlbumDTO>(album);
        }

        public async Task<List<AlbumDTO>> GetAllAlbums()
        {
            var albums = await _context.Albums.ToListAsync();

            return _mapper.Map<List<AlbumDTO>>(albums);
        }

        public async Task AddMusicToAlbum(MusicDTO musicDTO)
        {
            var album = await _context.Albums.FindAsync(musicDTO.Album.Id);
            var music = _mapper.Map<Music>(musicDTO);

            album.Music.Add(music);
        }

    }
}