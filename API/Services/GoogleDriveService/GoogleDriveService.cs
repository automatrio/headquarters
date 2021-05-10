using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Download;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Http;

namespace API.Services.GoogleDriveService
{
    public class GoogleDriveService : IStorageService
    {
        // fields
        private readonly string[] _scopes = { DriveService.Scope.Drive };
        private IUploadProgress _uploadProgress;
        private IDownloadProgress _downloadProgress;

        // properties
        public IUploadProgress UploadProgress
        {
        get => _uploadProgress;
        set => _uploadProgress = value;
        }

        public IDownloadProgress DownloadProgress
        {
        get => _downloadProgress;
        set => _downloadProgress = value;
        }


        private async Task<DriveService> GetDriveServiceInstance()
        {
            UserCredential credential;

            using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                // Use this if credentials.json will be stored locally in this computer
                //
                string credentialsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
                credentialsPath = Path.Combine(credentialsPath, "./Credentials/credentials.json");

                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    _scopes,
                    "APIUser",
                    CancellationToken.None,
                    new FileDataStore(credentialsPath, true));

                var service = new DriveService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "AutomatrioHeadquarters"
                });

                return service;
            }
        }

        public async Task<List<Google.Apis.Drive.v3.Data.File>> GetFilesByIds(params string[] ids)
        {
            var service = await GetDriveServiceInstance();

            var files = new List<Google.Apis.Drive.v3.Data.File>(); 

            foreach(string id in ids)
            {
                var request = service.Files.Get(id);
                files.Add(await request.ExecuteAsync());
            }

            return files;
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var service = await GetDriveServiceInstance();

            var fileMetaData = new Google.Apis.Drive.v3.Data.File()
            {
                Name = file.Name,
                MimeType = "audio/mpeg"
            };

            FilesResource.CreateMediaUpload request;

            using (var newMemoryStream = new MemoryStream())
            {
                await file.CopyToAsync(newMemoryStream);
                request = service.Files.Create(fileMetaData, newMemoryStream, "audio/mpeg");
                request.Fields = "id";
                _uploadProgress = await request.UploadAsync();
            }
            
            var responseFile = request.ResponseBody;

            return responseFile.Id;
        }

        public Task<DeleteObjectResponse> DeleteFileAsync(string keyName)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetFileUrlAsync(string id)
        {
            var service = await GetDriveServiceInstance();

            var files = new List<Google.Apis.Drive.v3.Data.File>(); 

            var request = service.Files.Get(id);

            return request.ExecuteAsync().Result.WebViewLink;
        }
    }
}