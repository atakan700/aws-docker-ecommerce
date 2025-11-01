import axios from "axios";
import { useEffect, useState } from "react";

type SubCategory={
  id:number,
  name:string,
  categoryId:number
}

type Category={
    id:number;
    name:string;
    subCategories:SubCategory[];
}


function CategoriList() {
  const [categories, setCategories] = useState<Category[]>([]);
 
  const getCategory=async (): Promise<Category[]> =>{
    const response= await axios.get<Category[]>("http://localhost:5001/api/kategoriler");
    console.log(response.data)
    return [];
  }
    
useEffect(()=>{
getCategory()

  }
)


  return (
    <div className="dropdown-content">
       <ul>
        {categories.map((c) => (
          <li key={c.id}> {c.name}</li>
        ))}
      </ul>
    </div>
     
    
  );
}

export default CategoriList;
