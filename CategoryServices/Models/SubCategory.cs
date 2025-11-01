using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CategoryServices.Models
{
    public class SubCategory
    {
        [Key]
        public int Id { get; set; } 

        [Required]
        public string Name { get; set; }

        // Foreign Key tanımı
        public int CategoryId { get; set; }



        [JsonIgnore]
        // Navigation property 
        public Category Category { get; set; }
    }

}
