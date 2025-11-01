using Microsoft.EntityFrameworkCore;
using CategoryServices.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); // Migration yoksa uygular
}
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    // API'ýn dýþarýdan eriþilebilir olduðu adresi belirtin.
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Category Service API V1");
});



app.UseCors("AllowReactApp");

// app.UseAuthorization(); // Gerekli deðilse kaldýr

app.MapControllers();



app.Run();
