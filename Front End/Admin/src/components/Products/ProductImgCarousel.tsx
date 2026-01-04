
import React, { useState } from 'react';
import { type Picture } from '../../hooks/ProductHooks'; // Senin hook dosyanın yolu

interface MiniCarouselProps {
    pictures: Picture[];
    cloudFrontDomain: string;
}

const MiniCarousel: React.FC<MiniCarouselProps> = ({ pictures, cloudFrontDomain }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Resim yoksa placeholder dön
    if (!pictures || pictures.length === 0) {
        return <span className="text-gray-400 text-xs">Resim Yok</span>;
    }

    // Tek resim varsa okları gösterme, sadece resmi bas
    if (pictures.length === 1) {
        return (
            <img
                src={`${cloudFrontDomain}/${pictures[0].url}`}
                alt="Product"
                className="w-16 h-16 object-cover rounded border border-gray-200"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Hata'; }}
            />
        );
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation(); // Tablo satırına tıklamayı engeller
        setCurrentIndex((prev) => (prev + 1) % pictures.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
    };

    const currentImageUrl = `${cloudFrontDomain}/${pictures[currentIndex].url}`;

    return (
        <div className="relative w-16 h-16 group">
            {/* Resim */}
            <img
                src={currentImageUrl}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover rounded border border-gray-200 transition-all duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Hata'; }}
            />

            {/* Sol Ok (Sadece hover olunca görünür) */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-0 bottom-0 bg-black bg-opacity-30 hover:bg-opacity-60 text-white w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-l"
            >
                &#8249; {/* Sol ok sembolü */}
            </button>

            {/* Sağ Ok */}
            <button
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 bg-black bg-opacity-30 hover:bg-opacity-60 text-white w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-r"
            >
                &#8250; {/* Sağ ok sembolü */}
            </button>

            {/* Resim Sayacı (İsteğe bağlı: sağ altta küçük nokta) */}
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-[8px] px-1 rounded-tl">
                {currentIndex + 1}/{pictures.length}
            </div>
        </div>
    );
};

export default MiniCarousel;