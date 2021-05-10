using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class MusicDataTransfer
    {
        public IFormFile File { get; set; }
        public MusicDTO MusicDTO { get; set; }
    }
}