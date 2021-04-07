using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Repository.CommentRepository
{
    public interface ICommentRepository
    {
        public Task<List<CommentDTO>> GetCommentsByBlogPostAsync(int parentBlogPostId);
        public Task<CommentDTO> CreateNewCommentAsync(CommentDTO comment);
        public Task<bool> DeleteBlogCommentAsync(int commentId);
        public Task<bool> SaveAllChangesAsync();
        public Task<int> IncreaseLikesCountAsync(int commentId);
    }
}