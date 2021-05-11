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
        
        // returns true if a new album was created, false if an existing one was updated
        // requires a call to SaveAllChangesAsync() separately
        public async Task<bool> UpsertAlbumAsync(AlbumDTO albumDTO)
        {
            var existingAlbum = await _context.Albums.FirstOrDefaultAsync(album => album.Title == albumDTO.Title);
            if(existingAlbum is not null)
            {
                var newAlbum = _mapper.Map<Album>(albumDTO);
                await _context.Albums.AddAsync(newAlbum);
                return true;
            }
            else
            {
                _mapper.Map(albumDTO, existingAlbum);
                _context.Albums.Update(existingAlbum);
                return false;
            }
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

        // public async Task UpdateMusicEntityUrlAsync(int albumId, string url)
        // {
        //     var album = await _context.Albums.FindAsync(albumId);

        //     var newMusic = new Music()
        //     {
        //         PublicId = 
        //     };

        //     album.Music.Add();
        // }

    }
}