using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;

namespace API.Services
{
    public interface IStorageService
    {
        public Task<string> UploadFileAsync(IFormFile file);
        public Task<DeleteObjectResponse> DeleteFileAsync(string keyName);
        public Task<string> GetFileUrlAsync(string keyName);
    }
}