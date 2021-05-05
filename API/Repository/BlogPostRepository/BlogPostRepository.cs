using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.BlogPostRepository
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BlogPostRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<int> CreateBlogPost(BlogPostDTO blogPostDTO)
        {
            var blogPost = new BlogPost()
            {
                Type = (BlogType)Enum.Parse(typeof(BlogType), blogPostDTO.Type),
                Title = blogPostDTO.Title,
                CreateDate = DateTime.UtcNow,
                Content = blogPostDTO.Content,
                Media = blogPostDTO.Media?.ToList()
            };
            await _context.AddAsync(blogPost);

            if(await SaveAllChangesAsync())
            {
                return blogPost.Id;
            }
            
            return 0;
        }

        public async Task<List<BlogPostDTO>> GetBlogPostsByTypeAsync(string type)
        {
            return await _context.BlogPosts.Where(
                blogPost =>
                    // String.Equals(blogPost.Type.ToString(), type, StringComparison.OrdinalIgnoreCase)
                    blogPost.Type == (BlogType)Enum.Parse(typeof(BlogType), type)
                )
                .Include(blogPost => blogPost.Media)
                .ProjectTo<BlogPostDTO>(_mapper.ConfigurationProvider)
                .OrderBy(blogPost => blogPost.CreateDate)
                .ToListAsync();
        }

        public async Task<BlogPost> GetBlogPostByIdAsync(int id)
        {
            return await _context.BlogPosts
                .Where(blogPost => blogPost.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(BlogPost blogPost)
        {
            _context.BlogPosts.Update(blogPost);
        }

        public async Task DeleteBlogPost(int blogPostId)
        {
            var blogPostToDelete = await _context.BlogPosts
                .Include(blogPost => blogPost.Media)
                .Include(blogPost => blogPost.Comments)
                .SingleOrDefaultAsync(blogPost => blogPost.Id == blogPostId);
                
            _context.BlogPosts.Remove(blogPostToDelete);

            // _context.Entry(blogPostToDelete).State = EntityState.Deleted;
        }
    }
}