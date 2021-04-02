using System;

namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public BlogPost ParentBlogPost { get; set; }
        
        #nullable enable
        public Comment? ParentComment { get; set; }
        #nullable disable
    }
}