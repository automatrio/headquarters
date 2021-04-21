using System.Threading.Tasks;
using API.DTOs;
using CloudinaryDotNet.Actions;

namespace API.Repository.PictureRepository
{
    public interface IPictureRepository
    {
        public Task AddPictureToBlogPostAsync(PictureDTO pictureDTO);
        public Task DeletePictureFromBlogPostAsync(string publicId);
        public Task<bool> SaveAllChangesAsync();
    }
}