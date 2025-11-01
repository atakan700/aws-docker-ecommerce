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
                    PictureUrl = x.PictureUrl,
                    SubCategoryId = x.SubCategoryId
                }).ToListAsync();

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
                PictureUrl = productDto.PictureUrl,

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
    

    [HttpPatch("id")]

        public async Task<IActionResult> AddProductPicture(int id,AddPictureDto pictureDto)
        {
            var product =await _context.Products.FindAsync(id);
            if (product == null)
            {
                return BadRequest("Ürün henüz eklenmemiş olabilir");
            }
            product.PictureUrl = pictureDto.PictureURL;

            await _context.SaveChangesAsync();

            return Ok("url kaydedildi");
        }

    } 
}

