using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using API.DTOs;
using Microsoft.AspNetCore.Http;

namespace API.Services.AWS.S3Service
{
    public class S3Service : IStorageService
    {
        private readonly IAmazonS3 _amazonS3Client;
        private string _bucketName = "hq_bucket_music";

        public S3Service(IAmazonS3 amazonS3Client)
        {
            _amazonS3Client = amazonS3Client;
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var fileTransferUtility = new TransferUtility(_amazonS3Client);

            await using (var newMemoryStream = new MemoryStream())
            {
                file.CopyTo(newMemoryStream);

                var uploadRequest = new TransferUtilityUploadRequest()
                {
                    InputStream = newMemoryStream,
                    Key = file.FileName,
                    BucketName = _bucketName
                };

                await fileTransferUtility.UploadAsync(uploadRequest);

                string filePath = "";

                uploadRequest.UploadProgressEvent += (object sender, UploadProgressArgs args) => {
                    filePath = args.FilePath;
                };

                return filePath;
            }
        }

        public async Task<DeleteObjectResponse> DeleteFileAsync(string keyName)
        {
            var deleteObjectRequest = new DeleteObjectRequest()
            {
                BucketName = _bucketName,
                Key = keyName
            };

            return await _amazonS3Client.DeleteObjectAsync(deleteObjectRequest);
        }

        public Task<string> GetFileUrlAsync(string keyName)
        {
            var request = new GetPreSignedUrlRequest()
            {
                BucketName = _bucketName,
                Key = keyName
            };

            return new Task<string>(() => _amazonS3Client.GetPreSignedURL(request));
        }
    }
}