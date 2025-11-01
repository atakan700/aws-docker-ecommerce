using Microsoft.EntityFrameworkCore;
using ProductServices.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
}
);



builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// YENÝ EKLE: Migration'larý Çalýþtýrma ve Hata Yönetimi
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<AppDbContext>();
        // Veritabanýnýn hazýr olmasýný beklemek için geçici bir bekleme döngüsü
        // Burasý Docker compose'daki sleep'in yerini alýr
        var maxRetries = 15;
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                // Veritabaný yoksa oluþturur, varsa migration'larý uygular
                dbContext.Database.Migrate();
                break; // Baþarýlý, döngüden çýk
            }
            catch (Microsoft.Data.SqlClient.SqlException ex) when (i < maxRetries - 1)
            {
                // Geçici SQL hatasý (sunucu hazýr deðil) durumunda bekleyip tekrar dene
                Console.WriteLine($"Database not ready yet (Attempt {i + 1}/{maxRetries}). Waiting 5 seconds... Error: {ex.Message}");
                System.Threading.Thread.Sleep(5000);
            }
            catch (Exception ex)
            {
                // Diðer tüm hatalarda fýrlat
                Console.WriteLine($"An error occurred during migration: {ex.Message}");
                throw;
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Critical error during application startup or migration: {ex.Message}");
        // Hata durumunda uygulama baþlatýlmasýn.
        Environment.Exit(1);
    }
}
// ...
// Mevcut if (app.Environment.IsDevelopment()) bloðu
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// ...
app.UseCors("AllowReactApp");
app.MapControllers();
app.Run();

