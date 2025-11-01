import axios from "axios";
import { FILE_SERVICE_URL,BASE_PRODUCT_URL} from "../constans/ProductApiUrl";


export type Product = {
  id: number;
  name: string;
  description?: string;
  pictureUrl?: string;
  subCategoryId: number;
  price: number;
  stock: number;
}

export const getProduct = async (): Promise<Product[]> => {
  try {

    const response = await axios.get<Product[]>(`${BASE_PRODUCT_URL}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("API'den Gelen Temiz Veriler:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return []; // Hata durumunda boş bir dizi döndürün
  }
};

export type addProduct = {
  name: string;
  description?: string;
  pictureUrl: string;
  subCategoryId: number;
  price: number;
  stock: number;
}

export const addProduct = async (newProduct: addProduct): Promise<any> => {

  try {
    const response = await axios.post(`${BASE_PRODUCT_URL}`, newProduct)
    return response.data
  }
  catch (error) {
    console.log(error)
  }
};


export const updateProduct = async (updtProduct: Product): Promise<Product[]> => {

  try {
    const response = await axios.put(`${BASE_PRODUCT_URL}${updtProduct.id}`, updtProduct);
    return response.data
  }
  catch (error) {
    console.log("Hata:", error)
    return ([])
  }

}

export const deleteProduct = async (id: number): Promise<any> => {

  try {
    const response = await axios.delete(`${BASE_PRODUCT_URL}${id}`);
    console.log(id, "ye sahip ürün silindi");
    return response.data
  }
  catch (error) {
    console.log("Hata:", error);
    return ([]);
  }

}

//FileService'e gidecek olan image post işlemi

export const uploadImages = async (files: File[], userId: string) => {

  if (!files || files.length == 0) {

    throw new Error("yüklenecek dosya seçilmedi veya yok")
  }


  const formData = new FormData();
  formData.append("userId", userId);

  for (const file of files) {
    formData.append("files", file); 
  }



  try {
  const response = await axios.post(
      `${FILE_SERVICE_URL}`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
      console.log("Yüklenen Dosyalar:", response.data.urls);
      alert("Yükleme başarılı!");
      return response.data.urls

   } catch (error) {
      console.error("Yükleme hatası:", error);
      alert("Bir hata oluştu.");
    }


};