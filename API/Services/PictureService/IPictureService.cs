using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Services.PictureService
{
    public interface IPictureService
    {
        public Task<ImageUploadResult> AddPictureAsync(IFormFile file);
        public Task<DeletionResult> DeletePictureAsync(string publicId);
    }
}