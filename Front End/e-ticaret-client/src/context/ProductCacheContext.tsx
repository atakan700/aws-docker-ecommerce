import { createContext, useContext, useState,type ReactNode } from 'react';
import { type Product } from '../hooks/ProductInfo';

interface ProductCacheContextType {
  cachedProducts: Product[];
  setCachedProducts: (products: Product[]) => void;
  getProductFromCache: (id: number) => Product | undefined;
  clearCache: () => void;
}

const ProductCacheContext = createContext<ProductCacheContextType | undefined>(undefined);

export const ProductCacheProvider = ({ children }: { children: ReactNode }) => {
  const [cachedProducts, setCachedProducts] = useState<Product[]>([]);

  const getProductFromCache = (id: number): Product | undefined => {
    return cachedProducts.find(p => p.id === id);
  };

  const clearCache = () => {
    setCachedProducts([]);
  };

  return (
    <ProductCacheContext.Provider 
      value={{ 
        cachedProducts, 
        setCachedProducts, 
        getProductFromCache,
        clearCache 
      }}
    >
      {children}
    </ProductCacheContext.Provider>
  );
};

export const useProductCache = () => {
  const context = useContext(ProductCacheContext);
  if (context === undefined) {
    throw new Error('useProductCache must be used within ProductCacheProvider');
  }
  return context;
};