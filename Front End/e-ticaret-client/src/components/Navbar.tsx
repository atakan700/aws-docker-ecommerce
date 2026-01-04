import { Link } from 'react-router-dom';
import HamburgerComponent from './HamburgerMenu'; 
import { useFavorites } from "../context/FavoritesContext";
import loveIcon from "../assets/Navbar/love.png";
import heartIcon from "../assets/Navbar/heart.png";


const { favorites } = useFavorites();

const user = {
  name: 'Kullanıcı',
  imageurl: './src/assets/Carousel/carousel1.png',
  imageSize: 50, 
};

const Navbar = () => {
  return (
    // Ana Navbar Konteynırı
    <nav className="flex justify-between items-center bg-[#f8f9fa] px-6 py-3 shadow-md border-b border-gray-200">
      
      {/* SOL KISIM: Kullanıcı Bilgisi */}
      <div className="flex items-center gap-4">
        <img
          className="rounded-full object-cover border border-gray-300"
          src={user.imageurl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
        <h2 className="text-lg font-semibold text-gray-700 hidden lg:block">
          {user.name} bey hoşgeldiniz
        </h2>
      </div>

      {/* ORTA KISIM: Linkler ve Hamburger */}
      <div className="flex items-center gap-8">
        {/* Hamburger Menü En Solda */}
        <HamburgerComponent />

        <ul className="flex items-center gap-6 list-none m-0 p-0">
          
          {/* Ana Sayfa */}
          <li>
            <Link to="/" className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors no-underline">
              <img src="./src/assets/Navbar/home.png" alt="Home" className="w-5 h-5" /> 
              <span className="hidden md:inline">Ana Sayfa</span>
            </Link>
          </li>

          {/* Giriş Yap */}
          <li>
            <Link to="/giris" className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors no-underline">
              <img src="./src/assets/Navbar/user.png" alt="User" className="w-5 h-5" />
              <span className="hidden md:inline">Giriş Yap</span>
            </Link>
          </li>

          {/* Favoriler */}
         <Link 
  to="/favorilerim" 
  className="relative flex items-center gap-2 hover:text-red-500 transition group"
>
  <div className="relative">
    <img 
      src={favorites.length > 0 ? heartIcon : loveIcon}
      alt="Favorilerim"
      className="w-6 h-6 group-hover:scale-110 transition-transform"
    />
    
    {favorites.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
        font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {favorites.length}
      </span>
    )}
  </div>
  <span>Favorilerim</span>
</Link>

          {/* Sepetim */}
          <li>
            <Link to="/sepetim" className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors no-underline">
              <img src="./src/assets/Navbar/bag.png" alt="Bag" className="w-5 h-5" />
              <span className="hidden md:inline">Sepetim</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* ARAMA ÇUBUĞU */}
      <div className="hidden xl:flex items-center mx-4">
        <form className="flex w-full">
          <input
            type="search"
            className="w-[300px] px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Ürün veya kategori ara..."
            aria-label="Search"
          />
          <button 
            className="px-4 py-2 bg-white text-green-600 border border-l-0 border-green-600 rounded-r-md hover:bg-green-600 hover:text-black transition-colors font-medium" 
            type="submit"
          >
            Ara
          </button>
        </form>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
          <img src="./src/assets/Navbar/facebook.png" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
          <img src="./src/assets/Navbar/twitter.png" alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
          <img src="./src/assets/Navbar/instagram.png" alt="Instagram" className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;