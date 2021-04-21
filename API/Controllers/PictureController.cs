using System.Threading.Tasks;
using API.DTOs;
using API.Repository.PictureRepository;
using API.Services.PictureService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PictureController : BaseApiController
    {
        private readonly IPictureService _pictureService;
        private readonly IPictureRepository _pictureRepository;

        public PictureController(IPictureService pictureService, IPictureRepository pictureRepository)
        {
            _pictureRepository = pictureRepository;
            _pictureService = pictureService;
        }

        [Authorize]
        [HttpPost("{blogPostId}")]
        public async Task<ActionResult<PictureDTO>> UploadPicture(IFormFile file, int blogPostId)
        {
            var result = await _pictureService.AddPictureAsync(file);

            if (result.Error is not null) return BadRequest(result.Error.Message);

            var newPicture = new PictureDTO()
            {
                BlogPostId = blogPostId,
                PublicId = result.PublicId,
                Url = result.SecureUrl.AbsoluteUri,
                Description = file.FileName
            };

            await _pictureRepository.AddPictureToBlogPostAsync(newPicture);

            if(await _pictureRepository.SaveAllChangesAsync())
            {
                return CreatedAtRoute(
                    "GetBlogPostById",
                    new { id = blogPostId },
                    newPicture
                    );
            }

            return BadRequest(result.Error.Message);
        }
    }
}