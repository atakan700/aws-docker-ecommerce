using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CategoryServices.Models;
using CategoryServices.Models.Entities;
using CategoryServices.Data;
namespace CategoryServices.Controllers
{
    [ApiController]
    [Route("api/kategoriler")]
    public class CategoryController:ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        
        public CategoryController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetKategoriler()
        {
            var kategoriler = await _appDbContext.Kategoriler
                .Include(k => k.SubCategories)
                .Select(k => new CategoryDto
                {
                    Id = k.Id,
                    Name = k.Name,
                    SubCategories = k.SubCategories.Select(sc => new SubCategoryDto
                    {
                        Id = sc.Id,
                        Name = sc.Name,
                    }).ToList()

                }).ToListAsync();
                
            return Ok(kategoriler);
        }

        [HttpPost]
        public async Task<IActionResult> CreateKategori(AddCategoryDto addCategoryDto) {

            var add = new Category()
            {
                Name = addCategoryDto.Name
            };
         _appDbContext.Kategoriler.Add(add);
         _appDbContext.SaveChanges();

            return Ok(add);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKategori(int id)
        {
            if(!ModelState.IsValid)
                { return BadRequest(ModelState); }

            var categoryId = await _appDbContext.Kategoriler.FindAsync(id);
          
            if(categoryId == null)
            {
                Console.WriteLine("Silmek istenilen kategori id bulunamadı");
                return BadRequest(ModelState);
            }
            _appDbContext.Remove(categoryId);
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>UpdateCategory(int id,UpdateCategoryDto updatecategoryDto)
        {
            var category = await _appDbContext.Kategoriler.FindAsync(id);

            if(category == null) { return BadRequest("Belirtilen id ye ait kategori bulunamadı"); }

            {
                category.Name = updatecategoryDto.Name;
            }
            await _appDbContext.SaveChangesAsync();
            return Ok();
            
        }
    }
}
