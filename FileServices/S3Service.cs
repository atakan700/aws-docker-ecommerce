using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;

public class S3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public S3Service(string accessKey, string secretKey, string region, string bucketName)
    {
        if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey))
            throw new InvalidOperationException("AWS AccessKey veya SecretKey bulunamadı.");

        if (string.IsNullOrEmpty(bucketName))
            throw new InvalidOperationException("BucketName boş olamaz.");

        _bucketName = bucketName;

        var config = new AmazonS3Config
        {
            RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region)
        };

        _s3Client = new AmazonS3Client(accessKey, secretKey, config);
    }

    public async Task<List<string>> UploadFilesAsync(List<IFormFile> files, string userId)
    {
        if (files == null || !files.Any())
            throw new ArgumentException("Yüklenen dosyalar boş olamaz.", nameof(files));

        if (string.IsNullOrEmpty(userId))
            throw new ArgumentException("UserId boş olamaz.", nameof(userId));

        var urls = new List<string>();
        var transferUtility = new TransferUtility(_s3Client);

        foreach (var file in files)
        {
            using var stream = file.OpenReadStream();
            var key = $"users/{userId}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = stream,
                Key = key,
                BucketName = _bucketName,
                ContentType = file.ContentType,
               
            };

            await transferUtility.UploadAsync(uploadRequest);

            
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Expires = DateTime.UtcNow.AddHours(1), 
                Verb = HttpVerb.GET
            };

            string presignedUrl = _s3Client.GetPreSignedURL(request);
            urls.Add(presignedUrl);
        }

        return urls;
    }
}
