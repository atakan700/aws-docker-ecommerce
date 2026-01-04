import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsBySubCategory, type Product } from "../hooks/ProductInfo";
import { useCart } from "../helpers/BucketFunc";
import { useProductCache } from "../context/ProductCacheContext";

const ProductList = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { AddtoBucket } = useCart();
  const { setCachedProducts } = useProductCache();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!subCategoryId) return;

      try {
        setLoading(true);
        const filteredProducts = await getProductsBySubCategory(
          Number(subCategoryId)
        );
        console.log("Yüklenen ürünler:", filteredProducts);
        setProducts(filteredProducts);
        
        // ✅ Cache'e kaydet (ProductDetail için)
        setCachedProducts(filteredProducts);
        console.log(`✅ ${filteredProducts.length} ürün cache'e kaydedildi`);
      } catch (error) {
        console.error("Ürünler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategoryId, setCachedProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Bu kategoride ürün bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Ürünler ({products.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
          >
            {/* Ürün Resmi */}
            <div className="relative h-64 bg-gray-100">
              {product.pictures && product.pictures.length > 0 ? (
                <img
                  src={product.pictures[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Resim yüklenemedi:", product.pictures[0].url);
                    e.currentTarget.src = "/placeholder-image.png";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Resim Yok
                </div>
              )}
              
              {/* Stok Badge */}
              {product.stock === 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Tükendi
                </div>
              )}
            </div>

            {/* Ürün Bilgileri */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                {product.description || "Açıklama yok"}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-orange-500">
                  {product.price} ₺
                </span>
                <span className={`text-sm font-semibold ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `Stok: ${product.stock}` : 'Stokta Yok'}
                </span>
              </div>

              {/* Butonlar */}
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
                >
                  📋 Ürünü İncele
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    AddtoBucket(product);
                  }}
                  disabled={product.stock === 0}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    product.stock > 0
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? '🛒 Sepete Ekle' : 'Stokta Yok'}
                </button>
              </div>
            </div>

            {/* Küçük Resim Gallerisi */}
            {product.pictures && product.pictures.length > 1 && (
              <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
                {product.pictures.slice(0, 4).map((pic, index) => (
                  <img
                    key={index}
                    src={pic.url}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-12 h-12 object-cover rounded border border-gray-300 flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.png";
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;