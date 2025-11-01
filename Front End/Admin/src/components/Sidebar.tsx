import { Link, useLocation } from 'react-router-dom';
import menuIcon from "../assets/Siderbar/menu.png";
import categoriesIcon from "../assets/Siderbar/categories.png";
import packageIcon from "../assets/Siderbar/package.png";
import truckIcon from "../assets/Siderbar/truck.png";
import customerIcon from "../assets/Siderbar/customer.png";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `no-underline flex items-center gap-4 text-2xl p-6 rounded transition-colors ${
      location.pathname === path
        ? 'bg-white text-sky-500 font-bold'
        : 'text-sky-100 hover:bg-sky-100 hover:text-black'
    }`;

  return (
    <aside className="w-64 bg-sky-500 text-white p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-sky-50">Admin Paneli</h2>
      <nav className="space-y-2">
        <Link to="/" className={linkClass('/')}>
          <img src={menuIcon} className="w-6 h-6" alt="Dashboard" />
          Dashboard
        </Link>

        <Link to="/kategoriler" className={linkClass('/kategoriler')}>
          <img src={categoriesIcon} className="w-6 h-6" alt="Kategoriler" />
          Kategoriler
        </Link>

        <Link to="/urunler" className={linkClass('/urunler')}>
          <img src={packageIcon} className="w-6 h-6" alt="Ürünler" />
          Ürünler
        </Link>

        <Link to="/siparisler" className={linkClass('/siparisler')}>
          <img src={truckIcon} className="w-6 h-6" alt="Siparişler" />
          Siparişler
        </Link>

        <Link to="/kullanicilar" className={linkClass('/kullanicilar')}>
          <img src={customerIcon} className="w-6 h-6" alt="Kullanıcılar" />
          Kullanıcılar
        </Link>
      </nav>
    </aside>
  );
}
