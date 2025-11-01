import React, { use, useState } from "react";
import Dropzone from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { uploadImages } from "../../hooks/ProductHooks";


interface ImageUploadProps {
  productId: number | "" ;
}

export default function ImageUpload({ productId }: ImageUploadProps) {
  
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploaded,setIsUploaded]=useState<boolean>(false);
  const [connnectionError,setConnectionError]=useState<boolean>(false);


  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const availableSlots = 4 - images.length; // kaç dosya daha eklenebilir
    let filesToAdd = acceptedFiles.slice(0, availableSlots);

    if (filesToAdd.length < acceptedFiles.length) {
      setError("En fazla 4 resim yükleyebilirsiniz, fazlalık atıldı");
    }

    setImages((prev) => [...prev, ...filesToAdd]);

    // fileRejections varsa onları da kontrol et
    if (fileRejections.length > 0) {
      fileRejections.forEach((rej) => {
        rej.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setError(`Dosya çok büyük: ${rej.file.name}`);
          } else if (err.code === "file-invalid-type") {
            setError(`Geçersiz dosya tipi: ${rej.file.name}`);
          }
        });
      });
    }
  };
  //gelen id bilgisi string'e çevriliyo
const[id,setId]=useState(String(productId))
  const uplImg= async()=>{
    try{
    const response= await uploadImages(images,id);
    console.log(response)
    setIsUploaded(true)
    setConnectionError(false)
    }
    catch(err){
      setConnectionError(true)
      console.log(err)
    }
  }




  return (<div>
 
    {!isUploaded &&

    <>
    {connnectionError &&
      <p>dosya gönderilemedi:Bağlantı hatası..</p>
    }
    <Dropzone
      onDrop={handleDrop}
      accept={{ "image/*": [] }}
      maxFiles={4}
      maxSize={10 * 1024 * 1024}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Resim yüklemek için tıklayınız veya sürükleyiniz..</p>
          </div>
          <div className="mt-4 flex flex-col gap-4 ">
            {images.map((file, index) => (
              <div className="flex items-center gap-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-24 h-24 object-cover border"
                />
                <button className="border rounded px-2 py-1"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== index));
                  }}>Kaldır</button>
              </div>

            ))}

          </div>

        </section>
      )}

    </Dropzone>     
    
    {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
      onClick={uplImg} 
      className="border rounded bg-cyan-700 text-white">
        Gönder
      </button>

    </>}

  {isUploaded &&

    <>
      <p>
        ürününüz başarıyla eklenmiştir.Ana sayfaya dönebilirsiniz...
      </p>

    </>
  
  }


                
  </div>
  );
}
