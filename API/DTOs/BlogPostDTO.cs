using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class BlogPostDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        #nullable enable
        public List<Media>? Media { get; set; }
        #nullable disable

        // public IReadonlyList<Comment> Comments { get; set; }
    }
}