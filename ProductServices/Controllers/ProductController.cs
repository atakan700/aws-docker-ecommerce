using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductServices.Data;
using ProductServices.Model;
using ProductServices.Model.Entities;
namespace ProductServices.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var product = await _context.Products
                .Select(x => new ProductDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Stock = x.Stock,
                    Price = x.Price,
                    SubCategoryId = x.SubCategoryId,
                    Pictures = x.Pictures.Select(pic => new PictureDto
                    {
                        Id = pic.UrlId,
                        Url = pic.Urls
                    }).ToList()
                }).ToListAsync();
            if (product == null) return NotFound();
            return Ok(product);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products.Include(
                p=>p.Pictures).FirstOrDefaultAsync(p=>p.Id==id);
                ;
                
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(AddProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool exist = await _context.Products
                   .AnyAsync(p => p.SubCategoryId == productDto.SubCategoryId
                   && p.Name.Trim().ToLower() == productDto.Name.Trim().ToLower());


            if (exist)
            {
                return BadRequest("Eklemeye çalıştığınız ürün zaten mevcut!!");
            }

            var newProduct = new Product()
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Stock = productDto.Stock,
                SubCategoryId = productDto.SubCategoryId,
                Price = productDto.Price,
                

            };

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            Console.WriteLine("Ürün eklendi");
            return Ok(newProduct.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest("URL'deki ID ile body'deki ID eşleşmiyor");
            }

            var oldProduct = await _context.Products.FindAsync(id);

            if (oldProduct == null)
            {
                return NotFound("Düzenleme yapılacak ürün bulunamadı");
            }


            {
                oldProduct.Name = productDto.Name;
                oldProduct.Description = productDto.Description;
                oldProduct.Stock = productDto.Stock;
                oldProduct.Price = productDto.Price;

                oldProduct.SubCategoryId = productDto.SubCategoryId;
            }
            await _context.SaveChangesAsync();

            Console.WriteLine(oldProduct.Id + " bulunan id.\n" + oldProduct.Name + "ürün adı\n");

            return Ok(productDto);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {


            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return BadRequest("Belirtilen id ye ait ürün bulunamadı!!");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}/pictures")]
        // Düzeltme 1: Parametre tipi AddPicturesDto yapıldı (Çünkü liste gönderiyoruz)
        public async Task<IActionResult> AddProductPictures(int id, [FromBody] AddPicturesDto addPicturesDto)
        {
            try
            {
                // Validasyon: addPicturesDto.Urls listesini kontrol ediyoruz
                if (addPicturesDto == null || addPicturesDto.Urls == null || !addPicturesDto.Urls.Any())
                {
                    return BadRequest("En az bir resim URL'si girilmelidir");
                }

                // Ürün var mı kontrol et
                var productExists = await _context.Products.AnyAsync(p => p.Id == id);
                if (!productExists)
                {
                    return NotFound($"ID'si {id} olan ürün bulunamadı");
                }

                // URL'lerden path'leri çıkar ve Pictures tablosuna ekle
                var pictures = new List<Picture>();

                // Düzeltme 2: addPicturesDto.Urls (Liste) üzerinde dönüyoruz
                foreach (var url in addPicturesDto.Urls)
                {
                    string path = ExtractPathFromUrl(url);

                    var picture = new Picture
                    {
                        
                        Urls = path,
                        ProductId = id
                    };

                    pictures.Add(picture);
                }

               
                await _context.Pictures.AddRangeAsync(pictures);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = $"{pictures.Count} adet resim başarıyla kaydedildi",
                    productId = id,
                    // Geriye dönerken oluşturulan yeni ID'leri (UrlId) gösteriyoruz
                    savedPictures = pictures.Select(p => new
                    {
                        urlId = p.UrlId,
                        // Modelindeki property adı Urls olduğu için:
                        url = p.Urls
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Resim URL'leri kaydedilirken bir hata oluştu: {ex.Message}");
            }
        }

        // Yardımcı metodun gayet iyi, aynen kalabilir.
        private string ExtractPathFromUrl(string url)
        {
            try
            {
                var uri = new Uri(url);
                string path = uri.AbsolutePath.TrimStart('/');

                if (path.StartsWith("users/"))
                {
                    path = path.Substring(6);
                }

                return path;
            }
            catch
            {
                return url;
            }
        }

    } 
}

