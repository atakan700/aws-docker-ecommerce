import { useEffect, useState } from "react";
import { getProductsWithImages, type Product } from "../hooks/ProductInfo";
import { useNavigate } from "react-router-dom";
import { useProductCache } from "../context/ProductCacheContext";
import { useFavorites } from "../context/FavoritesContext";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setCachedProducts } = useProductCache();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsWithImages();
        const displayProducts = data.slice(0, 10);
        setProducts(displayProducts);
        
        //  Tüm ürünleri cache'e kaydet (ProductDetail için)
        setCachedProducts(data);
        console.log(` ${data.length} ürün cache'e kaydedildi`);
      } catch (error) {
        console.error("Ürünler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setCachedProducts]);

  const handleFavoriteToggle = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-600 pl-3">
          Öne Çıkan Ürünler
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Favori Butonu - Sağ Üst */}
              <div className="relative">
                <button
                  onClick={(e) => handleFavoriteToggle(e, product)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full 
                    shadow-md hover:scale-110 transition-transform duration-200"
                  title={isFavorite(product.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                >
                  <span className="text-2xl">
                    {isFavorite(product.id) ? "❤️" : "🤍"}
                  </span>
                </button>

                {/* Resim Alanı */}
                <div className="h-48 p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {product.pictures && product.pictures.length > 0 ? (
                    <img
                      src={product.pictures[0].url}
                      alt={product.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.png";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-200 font-medium text-sm">
                      Resim Yok
                    </div>
                  )}
                </div>
              </div>

              {/* Ürün Bilgileri */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1" title={product.name}>
                  {product.name}
                </h3>
                
                <p className="text-2xl font-bold text-orange-600 mb-4">
                  {product.price} ₺
                </p>

                {/* Butonlar */}
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    className="w-full py-2 px-4 bg-white border border-orange-600 text-orange-600 
                      rounded-lg font-medium hover:bg-orange-50 hover:scale-105 
                      transition-all duration-200"
                    onClick={() => navigate(`/urunler/${product.id}`)}
                  >
                    İncele
                  </button>
                  
                  <button
                    className="w-full py-2 px-4 bg-orange-600 text-white rounded-lg font-medium 
                      hover:bg-orange-700 hover:scale-105 hover:shadow-lg 
                      transition-all duration-200"
                    onClick={() => navigate(`/urunler/${product.id}`)}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;