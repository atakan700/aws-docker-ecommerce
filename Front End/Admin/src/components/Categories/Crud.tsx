import editIcon from "../../assets/Product/pencil.png";
import deleteIcon from "../../assets/Product/bin.png";
import addIcon from "../../assets/Product/add.png";
import saveICon from "../../assets/Product/diskette.png"
import { useState } from "react";
import { createSubCategory, RemoveCategory, UpdateCategory } from "../../hooks/CategoriesHooks";
import { useAlert } from "../../context/AlertContext";




//kategori ismi düzenleniyo
interface CategoryProps{
    id:number
    name:string
}


function Crud({name ,id}:CategoryProps){



const [newCatName,setNewName]=useState("");
const[isEdit,setIsEdit]=useState(false);

const updateCat=async ()=>{
    if(newCatName===""){
        setIsEdit(false)
        return console.log("kategori ismi boş olamaz!!")        
    }
    try
    {
        await UpdateCategory(id,{name:newCatName})
         console.log("id:",id,"name",name,"e sahip kategori'",newCatName,"'adı ile düzenlendi")
            setIsEdit(false)
            setNewName("")
            window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    }catch(error){
        console.log(error)
    }
   
}

let editContent
 if(isEdit){
    editContent=( 
    <div>
        <label >
            <input className="w-32" placeholder= "Kategori adı " value={newCatName} onChange={(e)=>setNewName(e.target.value)} type="text" />
        </label>
    <button onClick={updateCat} className="border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-slate-500 w-8">
        <img src={saveICon} className="w-6 h-6" alt="Kaydet"/>
        </button>
    
        
    </div>
         )
        }else{ editContent=(
            <div>         
            <button onClick={()=>setIsEdit(true)} className=" border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-orange-500 w-8">
            <img src={editIcon} className="w-6 h-6" alt="Düzenle" />
            </button>
            </div>
         
        )}

//Kategori silme

const deleteCat=async()=>{
      try
    {
        await RemoveCategory(id)
         console.log("id:",id,"e sahip ",name," kategorisi silindi")
         window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    }catch(error){
        console.log(error)
    }
}


let deleteContent=(
    <>
        <button onClick={()=>deleteCat()} className="  border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-red-600 w-8">
            <img src={deleteIcon} className="w- h-6" alt="" />
            
        </button>
    </>
)


    return(
            
    <div className="flex px-6">   
         {editContent}          
        {deleteContent}
       
    </div>
             
        

    )
}
export default Crud


