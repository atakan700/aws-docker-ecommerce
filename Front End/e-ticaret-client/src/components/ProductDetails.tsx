import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, type Product } from "../hooks/ProductInfo";
import { useCart } from "../helpers/BucketFunc";
import { useProductCache } from "../context/ProductCacheContext";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loadSource, setLoadSource] = useState<string>("");
  const { AddtoBucket } = useCart();
  const { getProductFromCache } = useProductCache();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);

      // 1. ✅ Önce cache'den kontrol et
      const cachedProduct = getProductFromCache(Number(productId));
      
      if (cachedProduct) {
        console.log("📦 Ürün cache'den bulundu:", cachedProduct);
        setProduct(cachedProduct);
        setSelectedImage(cachedProduct.pictures?.[0]?.url || "");
        setLoadSource("cache");
        setLoading(false);
        return;
      }

      // 2. ⚡ Cache'de yoksa API'den çek
      console.log("🌐 Ürün cache'de bulunamadı, API'den çekiliyor...");
      try {
        const data = await getProductById(Number(productId));
        if (data) {
          setProduct(data);
          setSelectedImage(data.pictures?.[0]?.url || "");
          setLoadSource("api");
        }
      } catch (error) {
        console.error("API'den ürün çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, getProductFromCache]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Ürün detayları yükleniyor...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ürün bulunamadı!</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Debug Info - Geliştirme sırasında görebilirsiniz */}
      {loadSource && (
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
          {loadSource === "cache" ? "📦 Cache'den yüklendi" : "🌐 API'den yüklendi"}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sol Taraf: Resimler */}
        <div className="space-y-4">
          {/* Ana Resim */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {product.pictures && product.pictures.length > 0 ? (
              <img
                src={selectedImage || product.pictures[0].url}
                alt={product.name}
                className="w-full h-96 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.png";
                }}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Resim Yok</span>
              </div>
            )}
          </div>

          {/* Küçük Resimler */}
          {product.pictures && product.pictures.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.pictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic.url}
                  alt={`${product.name} - ${index + 1}`}
                  onClick={() => setSelectedImage(pic.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    selectedImage === pic.url 
                      ? 'border-orange-500 shadow-md' 
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.png";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sağ Taraf: Bilgiler */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-gray-600 text-base leading-relaxed">
              {product.description || "Açıklama mevcut değil"}
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {product.price.toFixed(2)} ₺
            </div>

            <div className={`text-lg font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 
                ? `✓ Stokta ${product.stock} adet mevcut` 
                : '✗ Stokta Yok'}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                AddtoBucket(product);
                alert('Ürün sepete eklendi!');
              }}
              disabled={product.stock === 0}
              className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition ${
                product.stock > 0
                  ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? '🛒 Sepete Ekle' : 'Stokta Yok'}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 px-6 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← Geri Dön
            </button>
          </div>

          {/* Ek Bilgiler */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ürün ID:</span>
              <span className="font-semibold">#{product.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kategori ID:</span>
              <span className="font-semibold">#{product.subCategoryId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;