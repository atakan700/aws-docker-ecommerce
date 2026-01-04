import { useEffect, useState } from "react";
import { getCategories, type Category, type SubCategory } from "../hooks/ProductInfo";
import { useNavigate } from "react-router-dom";
// import "./Categories.css"; // ARTIK GEREK YOK, SİLEBİLİRSİNİZ.

interface CategoriListProps {
  onItemClick?: () => void;
}

const CategoriList = ({ onItemClick }: CategoriListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Kategoriler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    navigate(`/urunler/${subCategoryId}`);
    onItemClick?.(); // Menüyü kapat
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 text-gray-500">
        Kategoriler yükleniyor...
      </div>
    );
  }

  return (
    // .category-list karşılığı
    <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        Kategoriler
      </h3>
      
      <div className="space-y-3"> {/* .category-item margin-bottom yerine space-y */}
        {categories.map((category) => (
          <div key={category.id} className="group">
            {/* .category-header karşılığı */}
            <div
              className={`
                flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors duration-300
                ${expandedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}
              `}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="font-medium">{category.name}</span>
              <span className={`text-sm transform transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : ''}`}>
                 {/* Ok işaretini CSS ile döndürmek daha akıcı görünür ama eski logic'i korudum */}
                 {expandedCategory === category.id ? "▼" : "▶"}
              </span>
            </div>

            {/* .subcategory-list ve .subcategory-item karşılığı */}
            {expandedCategory === category.id && (
              <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-100 ml-2 animate-fade-in">
                {category.subCategories.map((sub: SubCategory) => (
                  <div
                    key={sub.id}
                    className="p-2 text-sm text-gray-600 rounded cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => handleSubCategoryClick(sub.id)}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriList;