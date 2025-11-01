import { useEffect, useState } from "react";
import addIcon from "../../assets/Product/add.png"
import saveIcon from "../../assets/Product/diskette.png"
import { createCategory, createSubCategory, getCategories, type Category } from "../../hooks/CategoriesHooks"
import Crud from "./Crud";
import SubCrud from "./SubCrud";
import { useAlert } from "../../context/AlertContext";
import SkeletonCat from "./SkeletonCat";

function Categories() {

    //Kategori seçimi ile alt kategorilerin açılmasını sağlayan değişkenler
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const [selectedCategory,setSelectedCategory]=useState("")
    
    //Kategori verileri geliyo
    useEffect(() => {
    // Veriyi çekme fonksiyonu
    const fetchData = async () => {
        const data = await getCategories();
           setCategories(data);
                setLoading(false);
        //burada ise gelen ilk kategori seçiliyor ve alt kategori görüntülenmesine yardımcı oluyo 
        if (data.length > 0) {
            setSelectedCategoryId(data[0].id);
           
        }
    };

    // Sayfa açıldığında veriyi çek
    fetchData();

    // Event listener: başka sayfada CRUD işlemi yapıldığında tekrar çek
    const handler = () => fetchData();
    window.addEventListener("CategoriesUpdated", handler);


    return () => {
        window.removeEventListener("CategoriesUpdated", handler);
    };
}, []);


  const handleSelectedCat=(id:number,name:string)=>{
    setSelectedCategoryId(id)
    setSelectedCategory(name)
    
  }
//Kategori oluşturma
const[newCatName,setNewCatName]=useState(""); 
const[isCatAdd,setIsCatAdd]=useState(false)
const createCat= async ()=>{

        setIsAdd(true)
     if(newCatName===""){
        setIsCatAdd(false)
        showAlert("altkategori ismi boş olamazz!!","error")
        return console.log("kategori ismi boş olamazz!!")        
     }
        
     try{
      const response=await  createCategory({name:newCatName})
        if(typeof response=="object") {
          
         showAlert(`kategori eklendi: ${response} `, "success");
        
        }
        else if(typeof response=="string"){
            showAlert(`${response}`,"error")
        } 
          window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
            setIsCatAdd(false)
     }
     catch(err){
       
         showAlert("Beklenmeyen bi hata oluştu !!❌", "error");
     }
    
   
}
let addCatContent
if(isCatAdd){
    addCatContent=(
        <div className="flex ">
         <label className="w-auto" >
            <input placeholder= "Kategori adı " value={newCatName} onChange={(e)=>setNewCatName(e.target.value)} type="text" />
        </label>  
        <button 
        onClick={()=>createCat()} 
        className="flex items-center gap-2 px-2 border-1 border-slate-300 shadow-sm rounded-md w-auto h-1/6">  

        <img src={saveIcon} className="w-6 h-6" alt="Kaydet"/>
        Kaydet
        </button>     
        </div>

    )
}
else{
    addCatContent=(
        <>    
    <button onClick={()=>setIsCatAdd(true)} className=" flex items-center gap-2 px-2 border-1 border-slate-300 shadow-sm rounded-md w-auto h-1/6">
            <img src={addIcon} className="w-6 h-6" alt="" />
            Kategori Ekle
    </button>
    </>
    )

}

//Altkategori oluşturma
const[newSubCatName,setNewSubCatName]=useState(""); 
const[isAdd,setIsAdd]=useState(false)
const { showAlert } = useAlert();

const createSubCat= async (id:number)=>{
     setIsAdd(true)
     if(newSubCatName===""){
        setIsAdd(false)
        showAlert("altkategori ismi boş olamazz!!","error")
        return console.log("altkategori ismi boş olamazz!!")        
     }
        
     try{
      const response=await  createSubCategory({CategoryId:id,Name:newSubCatName})
        if(typeof response=="object") {
            setIsAdd(false)
         showAlert(`Alt kategori eklendi: ${response.name} `, "success");
        }
        else if(typeof response=="string"){
            showAlert(`${response}`,"error")
        } 
         window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
        
     }
     catch(err){
       
         showAlert("Beklenmeyen bi hata oluştu !!❌", "error");
     }
    
   
}

let addSubCatContent

if(isAdd)
{
    addSubCatContent=(   
    <div className="flex ">
       <label className="w-auto" >
            <input placeholder= "Yeni alt kategori adı " value={newSubCatName} onChange={(e)=>setNewSubCatName(e.target.value)} type="text" />
        </label> 
    <button 
    onClick={()=>createSubCat(selectedCategoryId)} 
    className="flex items-center gap-2 px-2 border-1 border-slate-300 shadow-sm rounded-md w-auto h-1/6">  

        <img src={saveIcon} className="w-6 h-6" alt="Kaydet"/>
        Kaydet
        </button>       
        
    </div>
    )
}else{
    addSubCatContent=(
    <>    
    <button onClick={()=>setIsAdd(true)} className=" flex items-center gap-2 px-2 border-1 border-slate-300 shadow-sm rounded-md w-auto h-1/6">
            <img src={addIcon} className="w-6 h-6" alt="" />
            Altkategori Ekle
    </button>
    </>

 )}


    if (loading) {
        return <div>
            <SkeletonCat/>
        </div>
    }


    return (
        <div >
            <aside
                className="h-4/5 w-4/5 bg-slate-100 text-slate-950 p-4 rounded border-1 shadow-sm flex flex-row space-x-4 ">

                <div className=" w-1/2 py-2 px-2">
                    <h3>Kategoriler</h3>
                    {addCatContent}

                    <ul className="py-3 pl-0">
                        {categories.map((cat) => (
                            <li key={cat.id}
                                onClick={() => handleSelectedCat(cat.id,cat.name)}
                                className={`flex items-center px-3 
                                ${ selectedCategoryId===cat.id
                                    ?"bg-slate-300 "
                                    :""
                                }  
                                hover:bg-slate-300 rounded-sm`}>
                                {cat.name}
                                <Crud id={cat.id} name={cat.name}/>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className=" w-2/3 px-2 py-2" >

                    <h3>AltKategoriler</h3>
                   {addSubCatContent}

                    <div className="max-h-64 overflow-y-auto rounded">
                        <table className=" ">
                            <th>
                                <tr className="border">
                                    İsim
                                </tr>

                            </th>
                            <th className="border-2">
                                İşlemler
                            </th>
                           

                            <tbody>
                                {categories
                                    .find((cat) => cat.id === selectedCategoryId)
                                    ?.subCategories.map((sub) => (
                                        <tr
                                            key={sub.id}
                                            className={`text-center border-b border-slate-300  "bg-gray-50" `}
                                        >
                                            <td >{sub.name}</td>
                                          
                                            <td  >
                                                 <button className="hover:border border-slate-500">
                                                    <SubCrud CategoryId={selectedCategoryId} id={sub.id} name={sub.name}/>
                                                </button>
                                               
                                            </td>
                                            
                                        </tr>

                                    ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </aside>


        </div>

    )
}
export default Categories