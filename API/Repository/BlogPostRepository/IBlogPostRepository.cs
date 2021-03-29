using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repository.BlogPostRepository
{
    public interface IBlogPostRepository : IRepository
    {
        public Task<List<BlogPostDTO>> GetBlogPostsByTypeAsync(string type);
        public Task<BlogPostDTO> GetBlogPostByIdAsync(int id);
        public Task<BlogPostDTO> CreateBlogPost(BlogPostDTO blogPost);
        void Update(BlogPost blogPost);
    }
}