using System.ComponentModel.DataAnnotations;

namespace ProductServices.Model
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        //ForeignKey
        public int SubCategoryId { get; set; }

        public int Stock { get; set; }

        public ICollection<Picture> Pictures { get; set; }
    }

    public class Picture
    {
        [Key]
        public int UrlId { get; set; }  // Primary Key
        public string Urls { get; set; }  // Resim path'i
        public int ProductId { get; set; }  // Foreign Key

        // Navigation Property
        public Product Product { get; set; }
    }
}
