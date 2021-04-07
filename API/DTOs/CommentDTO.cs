using System;

namespace API.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public int LikesCount { get; set; } = 0;
        public int ParentBlogPostId { get; set; }

        #nullable enable
        public int? ParentCommentId { get; set; }
        #nullable disable
    }
}