using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.CommentRepository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CommentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<CommentDTO> CreateNewCommentAsync(CommentDTO commentDTO)
        {
            var parentBlogPost = await this._context.BlogPosts.SingleOrDefaultAsync(post => post.Id == commentDTO.ParentBlogPostId);
            
            Comment parentComment =
            (commentDTO.ParentCommentId is not null)
                ?   await _context.Comments.SingleOrDefaultAsync(comment => comment.Id == commentDTO.ParentCommentId)
                :   null;

            var newComment = new Comment()
            {
                Author = commentDTO.Author,
                Content = commentDTO.Content,
                CreateDate = DateTime.UtcNow,
                ParentBlogPost = parentBlogPost,
                ParentComment = parentComment
            };

            // Must I add to the List<Comment> in the corresponding BlogPost?
            await _context.AddAsync(newComment);

            return _mapper.Map<CommentDTO>(newComment);
        }

        public async Task<bool> DeleteBlogCommentAsync(int commentId)
        {
            var deleteComment = await _context.Comments.FindAsync(commentId);

            if(deleteComment.ParentComment is null)
            {
                _context.Comments.Remove(deleteComment);
                return SaveAllChangesAsync().Result;
            }

            var commentsToDelete = await _context.Comments.Where(comm => comm.ParentBlogPost.Id == commentId).ToArrayAsync();
            commentsToDelete.Append(deleteComment);
            _context.Comments.RemoveRange(commentsToDelete);

            return SaveAllChangesAsync().Result;
        }

        public async Task<List<CommentDTO>> GetCommentsByBlogPostAsync(int parentBlogPostId)
        {
            var comments = await _context.Comments
                .Where(comment => comment.ParentBlogPost.Id == parentBlogPostId)
                .OrderBy(comment => comment.CreateDate)
                .Include(comment => comment.ParentBlogPost)
                .ToListAsync();

            return _mapper.Map<List<CommentDTO>>(comments);
        }

        public async Task<int> IncreaseLikesCountAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            comment.LikesCount += 1;

            _context.Entry(comment).State = EntityState.Modified;

            return comment.LikesCount;
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}