using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class AlbumDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Picture Cover { get; set; }
        public List<MusicDTO> Music { get; set; }
    }
}