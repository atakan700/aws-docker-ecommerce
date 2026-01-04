import { useState, useEffect, useMemo } from "react";
import Dropzone from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { uploadAndSaveImages, uploadImages } from "../../hooks/ProductHooks";

interface ImageUploadProps {
  productId: number | "";
}

export default function ImageUpload({ productId }: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((file) => {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  // Memoize productId string conversion
  const productIdString = useMemo(() => String(productId), [productId]);

  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null); // Clear previous errors
    
    const availableSlots = 4 - images.length;
    const filesToAdd = acceptedFiles.slice(0, availableSlots);

    if (filesToAdd.length < acceptedFiles.length) {
      setError("En fazla 4 resim yükleyebilirsiniz, fazlalık atıldı");
    }

    setImages((prev) => [...prev, ...filesToAdd]);

    // Handle file rejections
    if (fileRejections.length > 0) {
      const errorMessages: string[] = [];
      fileRejections.forEach((rej) => {
        rej.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            errorMessages.push(`Dosya çok büyük: ${rej.file.name} (Max: 10MB)`);
          } else if (err.code === "file-invalid-type") {
            errorMessages.push(`Geçersiz dosya tipi: ${rej.file.name}`);
          } else {
            errorMessages.push(`Hata: ${rej.file.name} - ${err.message}`);
          }
        });
      });
      setError(errorMessages.join(", "));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Lütfen en az bir resim seçin");
      return;
    }

    setIsUploading(true);
    setError(null);
    setConnectionError(false);

    try {
      const response = await uploadAndSaveImages(images, productIdString,parseInt(productIdString));
      console.log("Upload response:", response);
      setIsUploaded(true);
    } catch (err) {
      setConnectionError(true);
      setError("Dosya gönderilemedi. Lütfen tekrar deneyin.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploaded) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center gap-2 text-green-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-medium">
            Ürününüz başarıyla eklenmiştir. Ana sayfaya dönebilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {connectionError && (
        <div 
          className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700"
          role="alert"
          aria-live="polite"
        >
          Dosya gönderilemedi: Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.
        </div>
      )}

      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [] }}
        maxFiles={4}
        maxSize={10 * 1024 * 1024}
        disabled={isUploading}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              {...getRootProps()}
              className={`border-dashed border-2 p-6 text-center cursor-pointer rounded-md transition-colors ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-400 hover:border-gray-600"
              } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600">
                  {isDragActive
                    ? "Dosyaları buraya bırakın..."
                    : "Resim yüklemek için tıklayınız veya sürükleyiniz"}
                </p>
                <p className="text-xs text-gray-500">
                  (En fazla 4 resim, her biri max 10MB)
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600 font-medium">
                  Seçilen resimler ({images.length}/4):
                </p>
                {images.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-md border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover border rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="px-3 py-1 text-sm border rounded hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                      aria-label={`${file.name} resmini kaldır`}
                      disabled={isUploading}
                    >
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </Dropzone>

      {error && (
        <div 
          className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || images.length === 0}
        className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
          isUploading || images.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-cyan-700 hover:bg-cyan-800"
        }`}
      >
        {isUploading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Yükleniyor...
          </span>
        ) : (
          "Gönder"
        )}
      </button>
    </div>
  );
}