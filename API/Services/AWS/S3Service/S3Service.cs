using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace API.Services.AWS.S3Service
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _amazonS3Client;

        public S3Service(IAmazonS3 amazonS3Client)
        {
            _amazonS3Client = amazonS3Client;
        }

        public async Task UploadFileAsync(string filePath, string keyName, string bucketName)
        {
            var fileTransferUtility = new TransferUtility();

            using(var fileToUpload = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                await fileTransferUtility.UploadAsync(fileToUpload, bucketName, keyName);
            }
        }

        public async Task<DeleteObjectResponse> DeleteFileAsync(string keyName, string bucketName)
        {
            var deleteObjectRequest = new DeleteObjectRequest()
            {
                BucketName = bucketName,
                Key = keyName
            };

            return await _amazonS3Client.DeleteObjectAsync(deleteObjectRequest);
        }
    }
}