import { useEffect, useState } from "react";
import { addProduct } from "../../hooks/ProductHooks";
import { getCategories, type Category } from "../../hooks/CategoriesHooks";

export default function AddProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedSubCatId, setSelectedSubCatId] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  const [product, setProduct] = useState<addProduct>({
    name: "",
    description: "",
    pictureUrl: "",
    subCategoryId: 0,
    price: 0,
    stock: 0,
  });

  // Kategori verilerini getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      } catch (err) {
        console.error("Kategoriler yüklenirken hata:", err);
        setError("Kategoriler yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Alt kategori seçimini sıfırla kategori değiştiğinde
  useEffect(() => {
    setSelectedSubCatId("");
  }, [selectedCategoryId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "subCategoryId"
        ? Number(value)
        : value,
    }));
    
    // Hata mesajını temizle
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const validateForm = (): boolean => {
    if (!product.name.trim()) {
      setError("Ürün adı boş olamaz");
      return false;
    }
    if (!selectedSubCatId) {
      setError("Alt kategori seçilmelidir");
      return false;
    }
    if (product.price <= 0) {
      setError("Fiyat 0'dan büyük olmalıdır");
      return false;
    }
    if (product.stock < 0) {
      setError("Stok negatif olamaz");
      return false;
    }
    if (!product.description?.trim()) {
      setError("Ürün açıklaması boş olamaz");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const productToSubmit = {
        ...product,
        subCategoryId: Number(selectedSubCatId),
      };
      
      const result = await addProduct(productToSubmit);
      console.log("Sonuç:", result);
      
      setSuccessMessage("Ürün başarıyla eklendi!");
      
      // Formu sıfırla
      setProduct({
        name: "",
        description: "",
        pictureUrl: "",
        subCategoryId: 0,
        price: 0,
        stock: 0,
      });
      setSelectedSubCatId("");
    } catch (err: any) {
      console.error("Ürün eklenirken hata:", err);
      setError(err.message || "Ürün eklenirken bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h2>

      {error && (
        <div
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700"
          role="alert"
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h5 className="text-lg font-medium mb-4">Temel Bilgiler</h5>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Ürün Adı <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ürün adı"
                className="px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block mb-1 font-medium">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                <label htmlFor="subcategory" className="block mb-1 font-medium">
                  Alt kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="subcategory"
                  name="subCategoryId"
                  value={selectedSubCatId}
                  onChange={(e) => setSelectedSubCatId(Number(e.target.value))}
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategory}
                  required
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
                <label htmlFor="stock" className="block mb-1 font-medium">
                  Stok Sayısı <span className="text-red-500">*</span>
                </label>
                <input
                  id="stock"
                  name="stock"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={product.stock || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="price" className="block mb-1 font-medium">
                  Fiyat (₺) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={product.price || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Ürün Açıklaması <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="p-3 border rounded-md w-full min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ör: Saf pamuk..."
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Ekleniyor...
            </span>
          ) : (
            "Ürün Ekle"
          )}
        </button>
      </form>
    </div>
  );
}