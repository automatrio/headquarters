using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Repository.BlogPostRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogPostController : BaseApiController
    {
        private readonly IBlogPostRepository _blogPostRepository;
        private readonly IMapper _mapper;
        public BlogPostController(IBlogPostRepository blogPostRepository, IMapper mapper)
        {
            _mapper = mapper;
            _blogPostRepository = blogPostRepository;
        }

        [HttpPost]
        public async Task<ActionResult<BlogPostDTO>> CreateBlogPost(BlogPostDTO blogPostDTO)
        {
            var newBlogPost = await _blogPostRepository.CreateBlogPost(blogPostDTO);

            await _blogPostRepository.SaveAllChangesAsync();

            return newBlogPost;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostDTO>> GetBlogPostById(int id)
        {
            return await _blogPostRepository.GetBlogPostByIdAsync(id);
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<List<BlogPostDTO>>> GetBlogPostsByType(string type)
        {
            return await _blogPostRepository.GetBlogPostsByTypeAsync(type);
        }
    }
}