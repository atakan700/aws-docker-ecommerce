import { useEffect, useState, useMemo } from "react";
import { getCategories, type Category } from "../../hooks/CategoriesHooks";
import { addProduct, addProduct as AddProductType } from "../../hooks/ProductHooks";
import ImageUpload from "./ImageUpload";

interface ProductAddProps {
  onProductAdded: (id: number) => void;
}

export default function ProductAdd({ onProductAdded }: ProductAddProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedSubCatId, setSelectedSubCatId] = useState<number | "">("");
  const [nextStep, setNextStep] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [productId, setProductId] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [product, setProduct] = useState<AddProductType>({
    name: "",
    description: "",
    pictureUrl: "",
    subCategoryId: 0,
    price: 0,
    stock: 0,
  });

  // Memoize selected category to avoid unnecessary recalculations
  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      } catch (error) {
        console.error("Kategoriler yüklenemedi:", error);
        setValidationErrors(["Kategoriler yüklenirken hata oluştu"]);
      }
    };
    fetchData();
  }, []);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubCatId("");
  }, [selectedCategoryId]);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!product.name.trim()) {
      errors.push("Ürün adı boş olamaz");
    }

    if (product.price <= 0) {
      errors.push("Fiyat 0'dan büyük olmalıdır");
    }

    if (product.stock < 0) {
      errors.push("Stok negatif olamaz");
    }

    if (!selectedSubCatId) {
      errors.push("Alt kategori seçilmelidir");
    }

    if (!product.description?.trim()) {
      errors.push("Ürün açıklaması boş olamaz");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "stock", "subCategoryId"].includes(name)
        ? Number(value)
        : value,
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

    setIsSubmitting(true);

    try {
      const productToSubmit = {
        ...product,
        subCategoryId: Number(selectedSubCatId),
      };

      const result = await addProduct(productToSubmit);
      console.log("Ürün eklendi, ID:", result);
      
      onProductAdded(result);
      setProductId(result);
      setNextStep(true);
    } catch (error: any) {
      console.error("Ürün eklenirken hata:", error);
      setValidationErrors([
        error.message || "Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-200 rounded-md border overflow-y-auto p-6 space-y-6">
      <h3 className="text-xl font-semibold">Yeni ürün ekle</h3>

      {/* Validation Errors Display */}
      {validationErrors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
          aria-live="assertive"
        >
          <strong className="font-bold block mb-2">Lütfen aşağıdaki hataları düzeltin:</strong>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {!nextStep ? (
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          {/* Sol taraf - Temel Bilgiler */}
          <div className="flex flex-col gap-4 w-full lg:w-2/3">
            <h5 className="text-lg font-medium">Temel Bilgiler</h5>

            <div>
              <label htmlFor="product-name" className="block mb-1 font-medium">
                Ürün Adı <span className="text-red-500">*</span>
              </label>
              <input
                id="product-name"
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
                <label htmlFor="category-select" className="block mb-1 font-medium">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="category-select"
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
                <label htmlFor="subcategory-select" className="block mb-1 font-medium">
                  Alt kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="subcategory-select"
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
                <label htmlFor="product-stock" className="block mb-1 font-medium">
                  Stok Sayısı <span className="text-red-500">*</span>
                </label>
                <input
                  id="product-stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Stok miktarı girin"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={product.stock || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="product-price" className="block mb-1 font-medium">
                  Fiyat (₺) <span className="text-red-500">*</span>
                </label>
                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Fiyat girin"
                  className="px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={product.price || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="product-description" className="block mb-1 font-medium">
                Ürün Açıklaması <span className="text-red-500">*</span>
              </label>
              <textarea
                id="product-description"
                name="description"
                className="p-3 border rounded-md w-full min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ör: Saf pamuk..."
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Sağ taraf - Kaydet */}
          <div className="flex flex-col w-full lg:w-1/3 gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-6 rounded-md text-white font-medium transition-colors ${
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
                  Kaydediliyor...
                </span>
              ) : (
                "Kaydet ve Resim Ekle"
              )}
            </button>
            <p className="text-sm text-gray-600">
              <span className="text-red-500">*</span> işaretli alanlar zorunludur
            </p>
          </div>
        </form>
      ) : (
        <div>
          <h4 className="text-lg font-medium mb-4">Ürün Resimleri Ekle</h4>
          <ImageUpload productId={productId} />
        </div>
      )}
    </div>
  );
}