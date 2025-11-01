using Microsoft.AspNetCore.Mvc;
using CategoryServices.Data;
using Microsoft.EntityFrameworkCore;
using CategoryServices.Models.Entities;
using CategoryServices.Models;

namespace server.Controllers

{
    [ApiController]
    [Route("api/altkategoriler")]
    public class SubCategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubCategoryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubCategories()
        {
            var altkategoriler = await _context.SubCategory.ToListAsync();
            return Ok(altkategoriler);
        }

        [HttpPost]
        //Frombody gelen json dosyansını otomatik map eder.
        public async Task<IActionResult> CreateSubCategories([FromBody] AddSubCategoryDto Dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //gelen json içerisindeki data transfer objesi içindeki categorId kontrolü yapılıyor.
            var category = await _context.Kategoriler.FindAsync(Dto.CategoryId);
            if (category == null)
            {
                Console.WriteLine("Kategori id eşleşmedi!!");
                return BadRequest("Kategori bulunamadı");

            }

            //yeni bir alt kategori modele göre oluşturulup datalar eşleniyo
            var subcategory = new SubCategory
            {
                Name = Dto.Name,
                CategoryId = Dto.CategoryId,

            };

            var IsExist = await _context.SubCategory.AnyAsync(p=>p.CategoryId==Dto.CategoryId && p.Name.ToLower() == Dto.Name.ToLower());
            if (IsExist)
            {
                return BadRequest("Bu isme sahip bir altkategori var!!");
            }

            Console.WriteLine("Eklenen altkategori bilgileri \n", "CategoryId:", subcategory.CategoryId, " Name:", subcategory.Name);
            //Yeni kategori nesnesi EF Core’un DbContext’ine ekleniyor ama henüz kaydedilmiyor.
            _context.SubCategory.Add(subcategory);

            //oluşturulan kategori Db ye kaydediliyo
            await _context.SaveChangesAsync();


            return Ok(subcategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategories(int id)
        {
            var subCategory = await _context.SubCategory.FindAsync(id);

            if (subCategory == null)
                return NotFound("Silinmek istenen alt kategori bulunamadı!");

            _context.SubCategory.Remove(subCategory);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubCategories(int id ,[FromBody] SubCategoryDto subCategoryDto)
        {

            var subCategory = await _context.SubCategory.FindAsync(subCategoryDto.Id);

            if (subCategory == null)
            {
                return NotFound("Belirtilen altkategori bulunamadı");

            }

            {
                subCategory.Name = subCategoryDto.Name;
            }
            await _context.SaveChangesAsync();
            return Ok(subCategory);
        }
    }
}
