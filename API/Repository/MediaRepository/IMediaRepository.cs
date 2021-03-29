using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repository.MediaRepository
{
    public interface IMediaRepository : IRepository
    {
        public Task<List<Media>> GetMediaByTypeAsync(string mediaType);
        public Task<List<Media>> GetMediaByBlogAsync(int blogId);
        public Task AttachNewMediaToBlogAsync(MediaDTO media);
        void Update(Media media);
    }
}