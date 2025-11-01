using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly S3Service _s3Service;

    public UploadController(S3Service s3Service)
    {
        _s3Service = s3Service;
    }
    [HttpPost("multiple")]
    public async Task<IActionResult> UploadFiles([FromForm] List<IFormFile> files, [FromForm] string userId)
    {
        if (files == null || !files.Any() || string.IsNullOrEmpty(userId))
            return BadRequest("Files veya UserId eksik.");

        var fileUrls = await _s3Service.UploadFilesAsync(files, userId);
        return Ok(new { Urls = fileUrls });
    }

}
