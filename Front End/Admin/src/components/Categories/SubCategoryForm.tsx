import { useState } from "react";
import addIcon from "../../assets/Product/add.png";
import saveIcon from "../../assets/Product/diskette.png";

interface SubCategoryFormProps {
  onSubmit: (name: string) => Promise<void>;
  isSubmitting: boolean;
  disabled?: boolean;
}

export default function SubCategoryForm({ 
  onSubmit, 
  isSubmitting, 
  disabled = false 
}: SubCategoryFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmedName = subCategoryName.trim();
    
    // Validation
    if (!trimmedName) {
      setError("Alt kategori ismi boş olamaz");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Alt kategori ismi en az 2 karakter olmalıdır");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Alt kategori ismi en fazla 50 karakter olabilir");
      return;
    }

    try {
      await onSubmit(trimmedName);
      setSubCategoryName("");
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError("Alt kategori eklenemedi");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSubCategoryName("");
    setError(null);
  };

  if (isAdding) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Alt kategori adı"
            value={subCategoryName}
            onChange={(e) => {
              setSubCategoryName(e.target.value);
              if (error) setError(null);
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            autoFocus
            maxLength={50}
            aria-label="Alt kategori adı"
            aria-invalid={!!error}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-3 py-2 border border-slate-300 shadow-sm rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Alt kategoriyi kaydet"
          >
            <img src={saveIcon} className="w-5 h-5" alt="" />
            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label="İptal"
          >
            İptal
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsAdding(true)}
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-2 border border-slate-300 shadow-sm rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Yeni alt kategori ekle"
    >
      <img src={addIcon} className="w-5 h-5" alt="" />
      Alt Kategori Ekle
    </button>
  );
}