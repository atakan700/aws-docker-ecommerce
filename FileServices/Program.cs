using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
}
);

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // 100 MB
});

// Program.cs
builder.Services.AddScoped<S3Service>(provider =>
{
    var config = provider.GetRequiredService<IConfiguration>();

    // Docker Compose'daki "environment" altýndaki ÝSÝMLERLE birebir ayný olmalý
    var accessKey = config["AWS_ACCESS_KEY_ID"];
    var secretKey = config["AWS_SECRET_ACCESS_KEY"];
    var region = config["AWS_REGION"];
    var bucketName = config["S3_BUCKET_NAME"]; // Compose'da S3_BUCKET_NAME yazdýysan burayý da öyle deðiþtirmelisin!

    return new S3Service(accessKey, secretKey, region, bucketName);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
