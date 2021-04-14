using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Repository.MediaRepository;
using API.Services.PictureService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PictureController : BaseApiController
    {
        private readonly IPictureService _PictureService;
        private readonly IMediaRepository _mediaRepository;
        public PictureController(IPictureService PictureRepository, IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
            _PictureService = PictureRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PictureDTO>> UploadPicture(IFormFile file)
        {
            // gets the current user from its claims stored in the token
            int currentUser = int.Parse(User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.NameId).Value);

            var result = await _PictureService.AddPictureAsync(file);

            if (result.Error is not null) return BadRequest(result.Error.Message);

            var newPicture = new PictureDTO()
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.AbsoluteUri,
                Description = file.FileName
            };

            return Ok(await _mediaRepository.InsertNewMedia(newPicture));
        }
    }
}