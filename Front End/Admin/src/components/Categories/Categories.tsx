import { useEffect, useState, useCallback } from "react";
import {
  createCategory,
  createSubCategory,
  getCategories,
  type Category,
} from "../../hooks/CategoriesHooks";
import Crud from "./Crud";
import SubCrud from "./SubCrud";
import { useAlert } from "../../context/AlertContext";
import SkeletonCat from "./SkeletonCat";
import CategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();

  // Get selected category data
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  // Fetch categories data
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);

      // Auto-select first category if available
      if (data.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(data[0].id);
      }
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
      showAlert("Kategoriler yüklenemedi. Lütfen sayfayı yenileyin.", "error");
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, showAlert]);

  // Initial fetch and event listener setup
  useEffect(() => {
    fetchCategories();

    const handleCategoriesUpdate = () => fetchCategories();
    window.addEventListener("CategoriesUpdated", handleCategoriesUpdate);

    return () => {
      window.removeEventListener("CategoriesUpdated", handleCategoriesUpdate);
    };
  }, [fetchCategories]);

  // Handle category selection
  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  // Create new category
  const handleCreateCategory = async (name: string) => {
    setIsSubmitting(true);

    try {
      const response = await createCategory({ name });

      if (typeof response === "object") {
        showAlert(`"${name}" kategorisi eklendi`, "success");
        window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
      } else if (typeof response === "string") {
        showAlert(response, "error");
      }
    } catch (error: any) {
      console.error("Kategori oluşturma hatası:", error);
      showAlert(
        error.message || "Kategori eklenirken beklenmeyen bir hata oluştu",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create new subcategory
  const handleCreateSubCategory = async (name: string) => {
    if (!selectedCategoryId) {
      showAlert("Lütfen önce bir kategori seçin", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createSubCategory({
        CategoryId: selectedCategoryId,
        Name: name,
      });

      if (typeof response === "object") {
        showAlert(`"${response.name}" alt kategorisi eklendi`, "success");
        window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
      } else if (typeof response === "string") {
        showAlert(response, "error");
      }
    } catch (error: any) {
      console.error("Alt kategori oluşturma hatası:", error);
      showAlert(
        error.message || "Alt kategori eklenirken beklenmeyen bir hata oluştu",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <SkeletonCat />;
  }

  if (categories.length === 0) {
    return (
      <div className="h-4/5 w-4/5 bg-slate-100 p-8 rounded border shadow-sm">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Henüz kategori bulunmuyor</p>
          <CategoryForm
            onSubmit={handleCreateCategory}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <aside className="h-4/5 w-4/5 bg-slate-100 text-slate-950 p-4 rounded border shadow-sm flex flex-row space-x-4">
        {/* Sol taraf - Kategoriler */}
        <div className="w-1/2 py-2 px-2">
          <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>

          <div className="mb-4">
            <CategoryForm
              onSubmit={handleCreateCategory}
              isSubmitting={isSubmitting}
            />
          </div>

          <ul className="space-y-1">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer transition-colors ${
                  selectedCategoryId === cat.id
                    ? "bg-slate-300"
                    : "hover:bg-slate-200"
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectCategory(cat.id);
                  }
                }}
                aria-selected={selectedCategoryId === cat.id}
              >
                <span className="font-medium">{cat.name}</span>
                <Crud id={cat.id} name={cat.name} />
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ taraf - Alt Kategoriler */}
        <div className="w-2/3 px-2 py-2">
          <h3 className="text-lg font-semibold mb-3">Alt Kategoriler</h3>

          <div className="mb-4">
            <SubCategoryForm
              onSubmit={handleCreateSubCategory}
              isSubmitting={isSubmitting}
              disabled={!selectedCategoryId}
            />
          </div>

          {selectedCategory ? (
            <div className="max-h-96 overflow-y-auto rounded border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold border-b border-slate-300">
                      İsim
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold border-b border-slate-300">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory.subCategories.length > 0 ? (
                    selectedCategory.subCategories.map((sub) => (
                      <tr
                        key={sub.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3">{sub.name}</td>
                        <td className="px-4 py-3">
                          <SubCrud
                            categoryId={selectedCategoryId!}
                            id={sub.id}
                            name={sub.name}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                        Bu kategoriye ait alt kategori bulunmuyor
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Lütfen bir kategori seçin
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}