using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Repository.MusicRepository;
using API.Services;
using API.Services.AWS.S3Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MusicController : BaseApiController
    {
        private readonly IStorageService _storageService;
        private readonly IMusicRepository _musicRepository;
        public MusicController(IStorageService storageService, IMusicRepository musicRepository)
        {
            _musicRepository = musicRepository;
            _storageService = storageService;
        }

        [HttpGet("all")]
        public async Task<List<AlbumDTO>> GetAllAlbums()
        {
            return await _musicRepository.GetAllAlbums();
        }

        [HttpPost("create")]
        public async Task CreateNewAlbum(AlbumDTO albumDTO)
        {
            await _musicRepository.CreateAlbumAsync(albumDTO);
        }

        [HttpGet("id/{id}")]
        public async Task<AlbumDTO> GetAlbumById(int id)
        {
            return await _musicRepository.GetAlbumByIdAsync(id);
        }

        [HttpGet("title/{title}")]
        public async Task<AlbumDTO> GetAlbumByName(string title)
        {
            return await _musicRepository.GetAlbumByTitleAsync(title);
        }

        [HttpPost("add")]
        public async Task<ActionResult<string>> AddMusicToAlbum(MusicDataTransfer data)
        {
            await _storageService.UploadFileAsync(data.File);

            data.MusicDTO.Url = await _storageService.GetFileUrlAsync(data.File.FileName);

            await _musicRepository.AddMusicToAlbum(data.MusicDTO);

            return Ok(data.MusicDTO.Url);
        }
    }
}