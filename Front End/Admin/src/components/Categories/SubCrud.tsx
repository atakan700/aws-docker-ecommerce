import { useState } from "react";
import editIcon from "../../assets/Product/pencil.png";
import deleteIcon from "../../assets/Product/bin.png";
import saveIcon from "../../assets/Product/diskette.png";
import { RemoveSubCategory, UpdateSubCategory } from "../../hooks/CategoriesHooks";
import { useAlert } from "../../context/AlertContext";

interface SubCategoryProps {
  id: number;
  name: string;
  categoryId: number;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function SubCrud({
  id,
  name,
  categoryId,
  onUpdate,
  onDelete,
}: SubCategoryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSubCatName, setNewSubCatName] = useState(name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const validateName = (value: string): string | null => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Alt kategori ismi boş olamaz";
    }

    if (trimmed.length < 2) {
      return "Alt kategori ismi en az 2 karakter olmalıdır";
    }

    if (trimmed.length > 50) {
      return "Alt kategori ismi en fazla 50 karakter olabilir";
    }

    return null;
  };

  const handleUpdate = async () => {
    const validationError = validateName(newSubCatName);

    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedName = newSubCatName.trim();

    // Check if name actually changed
    if (trimmedName === name) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await UpdateSubCategory({ id, name: trimmedName });
      showAlert(`"${name}" alt kategorisi "${trimmedName}" olarak güncellendi`, "success");
      setIsEditing(false);
      onUpdate?.();
      window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    } catch (error: any) {
      const errorMessage = error.message || "Alt kategori güncellenemedi";
      setError(errorMessage);
      showAlert(errorMessage, "error");
      console.error("Alt kategori güncelleme hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `"${name}" alt kategorisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
    );

    if (!confirmed) return;

    setIsSubmitting(true);

    try {
      await RemoveSubCategory(id);
      showAlert(`"${name}" alt kategorisi silindi`, "success");
      onDelete?.();
      window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    } catch (error: any) {
      const errorMessage = error.message || "Alt kategori silinemedi";
      showAlert(errorMessage, "error");
      console.error("Alt kategori silme hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewSubCatName(name);
    setError(null);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <input
            type="text"
            value={newSubCatName}
            onChange={(e) => {
              setNewSubCatName(e.target.value);
              if (error) setError(null);
            }}
            placeholder={name}
            className="w-40 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            autoFocus
            maxLength={50}
            aria-label="Alt kategori adını düzenle"
            aria-invalid={!!error}
          />
          {error && (
            <span className="text-xs text-red-600 mt-1">{error}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="p-1.5 border-2 bg-slate-50 rounded hover:bg-green-100 hover:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Kaydet"
          aria-label="Değişiklikleri kaydet"
        >
          <img src={saveIcon} className="w-5 h-5" alt="" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="İptal"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={isSubmitting}
        className="p-1.5 border-2 bg-slate-50 rounded hover:bg-orange-100 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Düzenle"
        aria-label={`${name} alt kategorisini düzenle`}
      >
        <img src={editIcon} className="w-5 h-5" alt="" />
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isSubmitting}
        className="p-1.5 border-2 bg-slate-50 rounded hover:bg-red-100 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Sil"
        aria-label={`${name} alt kategorisini sil`}
      >
        <img src={deleteIcon} className="w-5 h-5" alt="" />
      </button>
    </div>
  );
}