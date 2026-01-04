import { useState } from "react";
import editIcon from "../../assets/Product/pencil.png";
import deleteIcon from "../../assets/Product/bin.png";
import saveIcon from "../../assets/Product/diskette.png";
import { RemoveCategory, UpdateCategory } from "../../hooks/CategoriesHooks";
import { useAlert } from "../../context/AlertContext";

interface CategoryProps {
  id: number;
  name: string;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function Crud({ name, id, onUpdate, onDelete }: CategoryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCatName, setNewCatName] = useState(name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const validateName = (value: string): string | null => {
    const trimmed = value.trim();
    
    if (!trimmed) {
      return "Kategori ismi boş olamaz";
    }
    
    if (trimmed.length < 2) {
      return "Kategori ismi en az 2 karakter olmalıdır";
    }
    
    if (trimmed.length > 50) {
      return "Kategori ismi en fazla 50 karakter olabilir";
    }
    
    return null;
  };

  const handleUpdate = async () => {
    const validationError = validateName(newCatName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedName = newCatName.trim();
    
    // Check if name actually changed
    if (trimmedName === name) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await UpdateCategory(id, { name: trimmedName });
      showAlert(`"${name}" kategorisi "${trimmedName}" olarak güncellendi`, "success");
      setIsEditing(false);
      onUpdate?.();
      window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    } catch (error: any) {
      const errorMessage = error.message || "Kategori güncellenemedi";
      setError(errorMessage);
      showAlert(errorMessage, "error");
      console.error("Kategori güncelleme hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `"${name}" kategorisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
    );

    if (!confirmed) return;

    setIsSubmitting(true);

    try {
      await RemoveCategory(id);
      showAlert(`"${name}" kategorisi silindi`, "success");
      onDelete?.();
      window.dispatchEvent(new CustomEvent("CategoriesUpdated"));
    } catch (error: any) {
      const errorMessage = error.message || "Kategori silinemedi";
      showAlert(errorMessage, "error");
      console.error("Kategori silme hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewCatName(name);
    setError(null);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 ml-auto">
        <div className="flex flex-col">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => {
              setNewCatName(e.target.value);
              if (error) setError(null);
            }}
            className="w-40 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            autoFocus
            maxLength={50}
            aria-label="Kategori adını düzenle"
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
    <div className="flex items-center gap-2 ml-auto">
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={isSubmitting}
        className="p-1.5 border-2 bg-slate-50 rounded hover:bg-orange-100 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Düzenle"
        aria-label={`${name} kategorisini düzenle`}
      >
        <img src={editIcon} className="w-5 h-5" alt="" />
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isSubmitting}
        className="p-1.5 border-2 bg-slate-50 rounded hover:bg-red-100 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Sil"
        aria-label={`${name} kategorisini sil`}
      >
        <img src={deleteIcon} className="w-5 h-5" alt="" />
      </button>
    </div>
  );
}