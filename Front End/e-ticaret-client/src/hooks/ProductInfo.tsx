import axios from "axios";
import { BASE_CATEGORY_URL, API_URL } from "../constant/CategoryApiUrl";
import { BASE_PRODUCT_URL, CloudFront_URL } from "../constant/ProductApiUrl";

export type SubCategory = {
  id: number;
  name: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
};

export interface Picture {
  id: number;
  url: string;  
  productId?: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  subCategoryId: number;
  price: number;
  stock: number;
  pictures: Picture[];
}

// Kategorileri getir
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(
      `${BASE_CATEGORY_URL}${API_URL.CATEGORIES}`
    );

    const cleanedData = response.data.map((category) => ({
      id: category.id,
      name: category.name,
      subCategories:
        category.subCategories?.map((subCategory: any) => ({
          id: subCategory.id,
          name: subCategory.name,
          categoryId: subCategory.categoryId,
        })) || [],
    }));

    return cleanedData;
  } catch (error) {
    console.error("Kategori verisi alınamadı:", error);
    return [];
  }
};

// Tüm ürünleri getir
export const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${BASE_PRODUCT_URL}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("API'den Gelen Ürünler:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ürün verisi alınamadı:", error);
    return [];
  }
};


// getProductById fonksiyonunu güncelleyin - CloudFront URL'leri ekleyelim
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_PRODUCT_URL}${id}`); 
    if (!response.ok) {
      throw new Error("Ürün getirilemedi");
    }
    const data = await response.json();
    
    // Resimleri CloudFront URL'leriyle güncelle
    if (data.pictures && Array.isArray(data.pictures)) {
      data.pictures = data.pictures.map((pic: Picture) => ({
        ...pic,
        url: getImageUrl(pic.url)
      }));
    }
    
    return data;
  } catch (error) {
    console.error("Tek ürün çekme hatası:", error);
    return null;
  }
};




export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath || typeof imagePath !== "string") {
    return "/placeholder-image.png";
  }

  const baseUrl = CloudFront_URL.replace(/\/$/, '');
  const cleanPath = imagePath.replace(/^\//, '');
  
  return `${baseUrl}/${cleanPath}`;
};


export const getProductsWithImages = async (): Promise<Product[]> => {
  try {
    const products = await getProduct();

    const productsWithImages = products.map((product) => {
      if (
        product.pictures &&
        Array.isArray(product.pictures) &&
        product.pictures.length > 0
      ) {
        product.pictures = product.pictures
          .filter((pic) => pic && pic.url)
          .map((pic) => ({
            ...pic,
            url: getImageUrl(pic.url), 
          }));
      } else {
        product.pictures = [];
      }
      return product;
    });

    console.log("Resim URL'leri ile ürünler:", productsWithImages);
    return productsWithImages;
  } catch (error) {
    console.error(" Ürünler yüklenirken hata:", error);
    return [];
  }
};

export const getProductsBySubCategory = async (
  subCategoryId: number
): Promise<Product[]> => {
  try {
    const allProducts = await getProductsWithImages();
    return allProducts.filter((p) => p.subCategoryId === subCategoryId);
  } catch (error) {
    console.error("Ürünler filtrelenirken hata:", error);
    return [];
  }
};