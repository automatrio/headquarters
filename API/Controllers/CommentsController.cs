using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Repository.CommentRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        private readonly ICommentRepository _commentRepository;
        public CommentsController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("{blogPostId}")]
        public async Task<ActionResult<List<CommentDTO>>> GetCommentsByBlogPostId(int blogPostId)
        {
            return await _commentRepository.GetCommentsByBlogPostAsync(blogPostId);
        }

        [HttpDelete("delete/{blogCommentId}")]
        public async Task<ActionResult<bool>> DeleteComment(int blogCommentId)
        {
            return await _commentRepository.DeleteBlogCommentAsync(blogCommentId);
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> CreateNewComment(CommentDTO comment)
        {
            var newComment = await _commentRepository.CreateNewCommentAsync(comment);

            await _commentRepository.SaveAllChangesAsync();

            return newComment;
        }
    }
}