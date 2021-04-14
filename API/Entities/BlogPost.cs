using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class BlogPost
    {
        public int Id { get; set; }
        public BlogType Type { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public List<Media> Media { get; set; } = new List<Media>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}

public enum BlogType
{
    MusicBlog,
    Devlog,
    Model3DBlog,
    NewsBlog,
    PictureBlog
}