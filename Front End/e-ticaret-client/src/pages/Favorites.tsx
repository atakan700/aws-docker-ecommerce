import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../helpers/BucketFunc";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { AddtoBucket } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-3xl font-bold text-gray-800">Favori Ürününüz Yok</h2>
          <p className="text-gray-600 max-w-md">
            Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
              hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Ürünleri Keşfet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ❤️ Favorilerim
          </h1>
          <p className="text-gray-600">
            {favorites.length} ürün listeleniyor
          </p>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Tüm favorileri temizlemek istediğinize emin misiniz?')) {
                clearFavorites();
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium 
              hover:bg-red-200 transition-colors"
          >
            🗑️ Tümünü Temizle
          </button>
        )}
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 
              hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Favori Butonu - Sağ Üst */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(product.id);
                }}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full 
                  shadow-md hover:scale-110 transition-transform duration-200"
                title="Favorilerden Çıkar"
              >
                <span className="text-2xl">❤️</span>
              </button>

              {/* Resim Alanı */}
              <div className="h-48 p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                {product.pictures && product.pictures.length > 0 ? (
                  <img
                    src={product.pictures[0].url}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-105 
                      transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.png";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full 
                    text-gray-400 bg-gray-200 font-medium text-sm">
                    Resim Yok
                  </div>
                )}
              </div>
            </div>

            {/* Ürün Bilgileri */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2" 
                title={product.name}>
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                {product.description || "Açıklama yok"}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-orange-600">
                  {product.price} ₺
                </span>
                <span className={`text-sm font-semibold ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `Stok: ${product.stock}` : 'Stokta Yok'}
                </span>
              </div>

              {/* Butonlar */}
              <div className="mt-auto flex flex-col gap-2">
                <button
                  className="w-full py-2 px-4 bg-white border border-blue-600 text-blue-600 
                    rounded-lg font-medium hover:bg-blue-50 hover:scale-105 
                    transition-all duration-200"
                  onClick={() => navigate(`/urunler/${product.id}`)}
                >
                  📋 İncele
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    AddtoBucket(product);
                    alert('Ürün sepete eklendi!');
                  }}
                  disabled={product.stock === 0}
                  className={`w-full py-2 px-4 rounded-lg font-medium 
                    transition-all duration-200 ${
                    product.stock > 0
                      ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? '🛒 Sepete Ekle' : 'Stokta Yok'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;