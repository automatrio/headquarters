using System.Threading.Tasks;
using Amazon.S3.Model;

namespace API.Services.AWS.S3Service
{
    public interface IS3Service
    {
        public Task UploadFileAsync(string filePath, string keyName, string bucketName);
        public Task<DeleteObjectResponse> DeleteFileAsync(string keyName, string bucketName);
    }
}