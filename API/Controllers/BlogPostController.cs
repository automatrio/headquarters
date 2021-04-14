using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Repository.BlogPostRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
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
            var blogPost = await _blogPostRepository.GetBlogPostByIdAsync(id);
            return _mapper.Map<BlogPostDTO>(blogPost);
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<List<BlogPostDTO>>> GetBlogPostsByType(string type)
        {
            return await _blogPostRepository.GetBlogPostsByTypeAsync(type);
        }

        [Authorize]
        [HttpDelete("delete/{blogPostId}")]
        public async Task<ActionResult> DeleteBlogPostAsync(int blogPostId)
        {
            await _blogPostRepository.DeleteBlogPost(blogPostId);
            return Ok(await _blogPostRepository.SaveAllChangesAsync());
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateBlogPost(BlogPostEditDTO editDTO)
        {
            var originalPost = await _blogPostRepository.GetBlogPostByIdAsync(editDTO.Id);

            _mapper.Map(editDTO, originalPost);

            _blogPostRepository.Update(originalPost);

            if(await _blogPostRepository.SaveAllChangesAsync()) return NoContent();

            return BadRequest("This post could not be updated.");
        }
    }
}