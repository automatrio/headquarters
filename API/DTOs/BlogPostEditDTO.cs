using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class BlogPostEditDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<Media> Media { get; set; } = new List<Media>();
    }
}