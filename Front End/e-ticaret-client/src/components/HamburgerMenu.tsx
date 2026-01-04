import { useState, useRef, useEffect } from "react";
import Hamburger from "hamburger-react";
import CategoriList from "../pages/Categories"; // Yolun doğruluğundan emin olun

function HamburgerComponent() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  // Menü dışına tıklanırsa kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    // 'relative' referans noktasıdır. 'z-50' menünün diğer öğelerin üstünde kalmasını sağlar.
    <div className="relative z-50 flex items-center" ref={menuRef}>
      <Hamburger size={24} toggled={open} toggle={handleToggle} />
      
      {open && (
        <div className="absolute top-full left-0 mt-4 w-64 bg-white shadow-xl border border-gray-100 rounded-lg max-h-[80vh] overflow-y-auto animate-fade-in-down">
          {/* Menü İçeriği */}
          <div className="p-2">
             <CategoriList onItemClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HamburgerComponent;