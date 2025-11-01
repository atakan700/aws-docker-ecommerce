import { useEffect, useState } from "react";
import { getCategories, type Category } from "../../hooks/CategoriesHooks";
import { addProduct, addProduct as AddProductType } from "../../hooks/ProductHooks";
import SkeletonCat from "../Categories/SkeletonCat";
import ImageUpload from "./ImageUpload";

interface ProductAddProps {
  onProductAdded: (id: number) => void;
}

export default function ProductAdd({ onProductAdded }: ProductAddProps) {

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedSubCatId, setSelectedSubCatId] = useState<number>();
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  const [nextStep,setNextStep]=useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [productId,setProductId]=useState<number|"">("");

  const [product, setProduct] = useState<AddProductType>({
    name: "",
    description: "",
    pictureUrl: "",
    subCategoryId: 0,
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
      setSelectedCategoryId(data[0]?.id ?? "");
    };
    fetchData();
  }, []);

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!product.name.trim()) {
      errors.push("Ürün adı boş olamaz");
    }
    
    if (product.price <= 0) {
      errors.push("Fiyat negatif olamaz ve sıfırdan büyük olmalıdır");
    }
    
    if (product.stock < 0) {
      errors.push("Stok negatif olamaz");
    }
    
    if (!selectedSubCatId) {
      errors.push("Alt kategori seçilmelidir");
    }
    
    if (!product.description || !product.description.trim()) {
      errors.push("Ürün açıklaması boş olamaz");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: ["price", "stock", "subCategoryId"].includes(name) ? Number(value) : value,
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    try {
      // Update product with selected subcategory ID
      const productToSubmit = {
        ...product,
        subCategoryId: selectedSubCatId || 0
      };
      
      //api üzerinden ürün ekleniyo ve gelen cevap ile id bilgisi bir sonraki adıma aktarılıyo
      const result = await addProduct(productToSubmit);
      console.log(result,"burda yazıldı")
      onProductAdded(result)
      setProductId(result)
      setNextStep(true)

    } catch (error: any) {
      console.log(error)
    };
  }

    return (
      <div className="flex flex-col bg-slate-200 rounded-md border h-1/3 overflow-y-auto p-6 space-y-6">
        <h3 className="text-xl font-semibold">Yeni ürün ekle</h3>
        
        {/* Validation Errors Display */}
        {validationErrors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <ul className="list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {!nextStep &&
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          {/* Sol taraf - Temel Bilgiler */}
          <div className="flex flex-col gap-4 w-full lg:w-2/3">
            <h5 className="text-lg font-medium">Temel Bilgiler</h5>

            <input
              name="name"
              type="text"
              placeholder="Ürün adı"
              className="px-3 py-2 border rounded-md w-full"
              value={product.name}
              onChange={handleChange}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1">Kategori</label>
                <select
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                  className="px-2 py-2 border rounded-md w-full"
                >
                  <option value="">Kategori Seç</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-1">Alt kategori</label>
                <select
                  name="subCategoryId"
                  value={selectedSubCatId}
                  onChange={(e) => setSelectedSubCatId(Number(e.target.value))}
                  className="px-2 py-2 border rounded-md w-full"
                  disabled={!selectedCategory}
                >
                  <option value="">Alt Kategori Seç</option>
                  {selectedCategory?.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1">Stok Sayısı</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Stok miktarı girin"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={product.stock || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1">Fiyat (₺)</label>
                <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Fiyat girin"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={product.price || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Ürün Açıklaması</label>
              <textarea
                name="description"
                className="p-3 border rounded-md w-full min-h-[120px]"
                placeholder="Ör: Saf pamuk..."
                value={product.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sağ taraf - Görsel ve Kaydet */}
          <div className="flex flex-col w-full lg:w-1/3 gap-6">
           
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 self-start"
            >
              Kaydet
            </button>
          </div>
        </form>
                  }

       {
        nextStep&& 
        <ImageUpload productId={productId} />
       }           
      </div>
    );
  }


