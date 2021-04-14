using System;
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
        public DateTime CreateDate { get; set; }
        public List<Media> Media { get; set; } = new List<Media>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}