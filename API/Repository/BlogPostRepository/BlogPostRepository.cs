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

        public async Task<BlogPostDTO> CreateBlogPost(BlogPostDTO blogPostDTO)
        {
            var blogPost = new BlogPost()
            {
                Type = (BlogType)Enum.Parse(typeof(BlogType), blogPostDTO.Type),
                Title = blogPostDTO.Title,
                Content = blogPostDTO.Content,
                Media = blogPostDTO.Media?.ToList()
            };
            await _context.AddAsync(blogPost);
            
            return _mapper.Map<BlogPostDTO>(blogPost);
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
                .ToListAsync();
        }

        public async Task<BlogPostDTO> GetBlogPostByIdAsync(int id)
        {
            return await _context.BlogPosts
                .Where(blogPost => blogPost.Id == id)
                .ProjectTo<BlogPostDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(BlogPost blogPost)
        {
            _context.Entry(blogPost).State = EntityState.Modified;
        }
    }
}