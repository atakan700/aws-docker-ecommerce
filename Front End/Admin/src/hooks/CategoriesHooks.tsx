
import { useState } from "react";
import { BASE_CATEGORY_URL,API_URL} from "../constans/CategoryApiUrl";
import axios from "axios"

export type  SubCategory ={
  id: number;
  name: string;
  categoryId: number;
}

export type Category ={
  id: number;
  name: string;
  subCategories:SubCategory[];
  
}

//Kategori bilgileri alınıp liste haline getiriliyo

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(
      `${BASE_CATEGORY_URL}${API_URL.CATEGORİES}`
    );
    console.log("ilk data:",response.data)

    const cleanedData = response.data.map((category) => ({
      id: category.id,
      name: category.name,
      subCategories:
        category.subCategories?.map((subCategory:any) => ({
          id: subCategory.id,
          name: subCategory.name,
          categoryId: subCategory.categoryId,
        })) || [],
    }));

    console.log(cleanedData);
    return cleanedData;

  } catch (error) {
    console.error("Kategori verisi alınamadı:", error);
    return[]
  }
};


type NewCategory={
  name:string
}
//kategoriler için CRUD işlemleri
export const createCategory= async(newCategory:NewCategory)=>{
  const response=await axios.post(`${BASE_CATEGORY_URL}${API_URL.CATEGORİES}`,newCategory);
  console.log(response.data)
}

type Id=number;

export const RemoveCategory=async(id:Id)=>{
  const response= await axios.delete(`${BASE_CATEGORY_URL}${API_URL.CATEGORİES}${id}`)
  console.log(response)
}

export type Newname={
  name:string;
}

export const UpdateCategory=async(id:Id,newname:Newname)=>{
  const response=await axios.put(`${BASE_CATEGORY_URL}${API_URL.CATEGORİES}${id}`,newname);
  console.log(response)
}


//Altkategoriler için CRUD işlemleri
type NewSubCategory={
  CategoryId:number,
  Name:string
}

export const createSubCategory = async (newSubCategory:NewSubCategory)=>{
  try{
    const response=await axios.post(`${BASE_CATEGORY_URL}${API_URL.SUBCATEGORİES}`,newSubCategory)
    console.log(response.data)
    return response.data
  }
  catch(error:any){
    if(error.response){
      console.log("hata:",error.response.data)
      return(error.response.data)
    } 
    else{
      console.log("Beklenmeyen hata:",error.message)
      return{message:"beklenmeyen bi hata oluştu "}
    }
  }
}




export const RemoveSubCategory=async(id:Id)=>{
  const response= await axios.delete(`${BASE_CATEGORY_URL}${API_URL.SUBCATEGORİES}${id}`);
  console.log("gönderilen id:",id)
  console.log(response)
}

type UpdateSubCat={
  id:number
  name:string
}

export const UpdateSubCategory=async(updateSubCat:UpdateSubCat)=>{
  const response=await axios.put(`${BASE_CATEGORY_URL}${API_URL.SUBCATEGORİES}${updateSubCat.id}`,updateSubCat)
  console.log("gönderilen id:",updateSubCat.id,"gönderilen isim:",updateSubCat.name)
  console.log(response)
}