import { useState, useEffect } from 'react';
// Product tipini zaten import etmişsin, süper.
import type { Product } from '../hooks/ProductInfo';


// Sepetteki ürünün yapısını da tanımlayalım (Product'tan biraz farklı, çünkü 'adet' var)
interface CartItem {
  product_id: number; // veya string, id tipine göre değişir
  name: string;
  price: number;
  image: string;
  adet: number;
}

const getInitialCart = (): CartItem[] => {
  const savedCart = localStorage.getItem('guestBucket');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const useCart = () => {
  // State'e <CartItem[]> diyerek tip güvenliği sağlıyoruz
  const [bucket, setBucket] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem('guestBucket', JSON.stringify(bucket));
  }, [bucket]);

 
  const AddtoBucket = (product: Product) => {
    setBucket((currentBucket) => {
      // Ürün var mı kontrol et
      const existProduct = currentBucket.find(item => item.product_id === product.id);

      if (existProduct) {
        // Varsa adet artır
        return currentBucket.map(item =>
          item.product_id === product.id ? { ...item, adet: item.adet + 1 } : item
        );
      } else {
        // Yoksa yeni obje oluşturup ekle
        // Not: Burada 'product.ad', 'product.fiyat' gibi propertylerin
        // senin 'Product' tipinde tanımlı olduğundan emin olmalısın.
        const NewProduct: CartItem = { 
            product_id: product.id, 
            name: product.name , // Product tipinde hangisi varsa onu kullan
            price: product.price , 
            image: product.pictures[0]?.url || "", 
            adet: 1 
        };
        
        return [...currentBucket, NewProduct];
      }
    });
  };

  return { bucket, AddtoBucket };
};