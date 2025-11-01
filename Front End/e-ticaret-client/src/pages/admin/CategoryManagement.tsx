import { useEffect, useState } from "react";
import "./CategoryManagement.css"

type Kategori={

    id:number;
    name:string;
}
function Category(){

      const [categories, setCategories] = useState<Kategori[]>([]);
    
      useEffect(() => {
        fetch("https://localhost:7107/api/kategoriler")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Veri çekilemedi.");
            }
            return response.json();
          })
          .then((data) => setCategories(data))
          .catch((error) => console.error("Hata:", error));
      }, []);

    return(
      
 
<div className="page-wrapper">
  <form className="form-container">
     <h2 className="text-center mb-4">Kategorileri Yönet</h2>

    <div className="mb-3">
      <label htmlFor="mainCategory" className="form-label">Ana Kategori</label>
      <select className="form-select" id="mainCategory" required>
        {categories.map((c) => (
          <option key={c.id}>{c.name}</option>
        ))}
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">Alt Kategori İsmi </label>
      <input
        type="text"
        className="form-control"
        placeholder="Alt kategori adını giriniz."
      />
    </div>

    <button type="submit" className="btn btn-warning w-100 submit-button">
      Kaydet
    </button>
  </form>
</div>

    );
} 

export default Category;