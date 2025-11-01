import editIcon from "../../assets/Product/pencil.png";
import deleteIcon from "../../assets/Product/bin.png";
import addIcon from "../../assets/Product/add.png";
import saveICon from "../../assets/Product/diskette.png"
import {  RemoveSubCategory, UpdateSubCategory } from "../../hooks/CategoriesHooks";
import { useState } from "react";
import { useAlert } from "../../context/AlertContext";

interface CategoryProps {
    id: number
    name: string
    CategoryId: number
}
export default function SubCrud({ id, name, CategoryId }: CategoryProps) {

    const [newSubCatName, setNewSubCatName] = useState("");
    const [isAdd, setIsAdd] = useState(false)
    const { showAlert } = useAlert();

    const updateSubCat = async () => {

        setIsAdd(true)
        if (newSubCatName === "") {
            setIsAdd(false)
            showAlert("altkategori ismi boş olamazz!!", "error")
            return console.log("")
        }

        try {
            const response = await UpdateSubCategory({ id: id, name: newSubCatName })
             window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
             setIsAdd(false)
            if (typeof response == "object") {
                setIsAdd(false)
                showAlert(`Alt kategori eklendi: ${response} `, "success");
                
            }
            else if (typeof response == "string") {
                showAlert(`${response}`, "error")
            }

        }
        catch (err) {

            showAlert("Beklenmeyen bi hata oluştu !!❌", "error");
        }


    }

    let editContent

    if (isAdd) {
        editContent = (
            <>
                <label >
                    <input placeholder={name} value={newSubCatName} onChange={(e) => setNewSubCatName(e.target.value)} type="text" />
                </label>
                <button onClick={() => updateSubCat()} className="border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-slate-500 w-8">

                    <img src={saveICon} className="w-6 h-6" alt="Kaydet" />
                </button>


            </>
        )
    } else {
        editContent = (
            <>
                <button onClick={() => setIsAdd(true)} className=" border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-orange-500 w-8">
                    <img src={editIcon} className="w- h-6" alt="" />
                </button>
            </>

        )
    }

    const deleteSubCat = async () => {
        try {
            await RemoveSubCategory(id)
            console.log("id:", id, "e sahip ", name, "altkategorisi kategorisi silindi")
             window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
        } catch (error) {
            console.log(error)
        }

    }


let deleteContent = (
            <>
                <button
                onClick={()=>deleteSubCat()} 
                className="  border-2 font-medium text-sm text-stone-500 text-right bg-slate-50 rounded hover:text-stone-900 hover:bg-red-600 w-8">
                    <img src={deleteIcon} className="w- h-6" alt="" />

                </button>
            </>
        )
    
        return (
            <div className="px-3">
                {editContent}
                {deleteContent}
            </div>

        )
    
    }

