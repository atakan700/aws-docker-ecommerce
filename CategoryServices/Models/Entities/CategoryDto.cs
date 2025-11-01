namespace CategoryServices.Models.Entities
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SubCategoryDto> SubCategories { get; set; }
    }

    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class AddCategoryDto
    {
        public string Name { get; set; }
    }

    public class UpdateCategoryDto
    {
        public string Name { get; set; }
    }
    public class AddSubCategoryDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

    }
    public class DeleteSubCategoryDto
    {
        public int CategoryId { get; set; }
    }
}
