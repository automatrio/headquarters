using System.Collections.Generic;
using System.Text.Json.Serialization;
using API.Entities;
using API.Helpers;

namespace API.DTOs
{
    public class BlogPostEditDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        [JsonConverter(typeof(MediaConverter))]
        public List<MediaDTO> Media { get; set; } = new List<MediaDTO>();
    }
}