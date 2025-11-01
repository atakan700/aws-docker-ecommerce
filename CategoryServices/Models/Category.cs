using System.ComponentModel.DataAnnotations;

namespace CategoryServices.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; } //PRİMER KEY
        [Required]
        public string Name { get; set; }

        public List<SubCategory>SubCategories { get; set; }
    }
}
