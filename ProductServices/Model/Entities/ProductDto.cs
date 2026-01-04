namespace ProductServices.Model.Entities
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int SubCategoryId { get; set; }

        public int Price { get; set; }

        public int Stock { get; set; }
        public List<PictureDto> Pictures { get; set; }
    }


    public class AddProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int SubCategoryId { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; } = 0;

    }

    public class DeleteProductDto
    {
        public int Id { get; set; }

    }

    public class PictureDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
    }

    public class AddPicturesDto
    {
        public int Id { get; set; }
        public List<string> Urls { get; set; }
    }
}
