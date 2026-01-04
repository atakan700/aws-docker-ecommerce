import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Product } from '../hooks/ProductInfo';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      // Zaten favorilerde mi kontrol et
      if (prev.some(item => item.id === product.id)) {
        console.log(' Ürün zaten favorilerde');
        return prev;
      }
      console.log(' Favorilere eklendi:', product.name);
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => {
      const filtered = prev.filter(item => item.id !== productId);
      console.log(' Favorilerden çıkarıldı, ID:', productId);
      return filtered;
    });
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    console.log(' Tüm favoriler temizlendi');
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite,
        clearFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};