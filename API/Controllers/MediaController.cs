using System.Threading.Tasks;
using API.DTOs;
using API.Repository.MediaRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MediaController : BaseApiController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IMapper _mapper;
        public MediaController(IMediaRepository mediaRepository, IMapper mapper)
        {
            _mapper = mapper;
            _mediaRepository = mediaRepository;
        }

        [HttpGet("{type}")]
        public async Task<ActionResult<MediaDTO>> GetMediaByType(string mediaType)
        {
            var result = await this._mediaRepository.GetMediaByTypeAsync(mediaType);

            // expand to map to MediaDTOs children
            return _mapper.Map<MediaDTO>(result);
        }

        [HttpPost]
        public async Task AttachMediaToBlogPost(MediaDTO mediaDTO)
        {
            await _mediaRepository.AttachNewMediaToBlogAsync(mediaDTO);
            await _mediaRepository.SaveAllChangesAsync();
        }
    }
}