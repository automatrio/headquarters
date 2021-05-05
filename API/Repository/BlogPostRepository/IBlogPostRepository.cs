using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repository.BlogPostRepository
{
    public interface IBlogPostRepository : IRepository
    {
        public Task<List<BlogPostDTO>> GetBlogPostsByTypeAsync(string type);
        public Task<BlogPost> GetBlogPostByIdAsync(int id);
        public Task<int> CreateBlogPost(BlogPostDTO blogPost);
        public Task DeleteBlogPost(int blogPostId);
        public void Update(BlogPost blogPost);
    }
}