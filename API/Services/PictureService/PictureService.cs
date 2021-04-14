using System.Threading.Tasks;
using API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services.PictureService
{
    public class PictureService : IPictureService
    {
       private readonly Cloudinary _cloudinary;
        public PictureService(IOptions<CloudinaryOptions> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddPictureAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Width(500).Height(300).Crop("fill")
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    return uploadResult;
                }
            }
            return uploadResult;
        }
        public async Task<DeletionResult> DeletePictureAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deletionParams);
        } 
    }
}