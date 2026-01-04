import { Routes, Route } from "react-router-dom";
import Logreg from "./pages/LoginRegister";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import ProductList from "./pages/Product";
import Home from "./pages/Home"; 
import ProductDetail from "./components/ProductDetails";
//import { ProductCacheProvider } from "./context/ProductCacheContext";
import Favorites from "./pages/Favorites";
//import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
           <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/giris" element={<Logreg />} />
            <Route path="/kategori" element={<Categories />} />
            <Route path="/kategori/:subCategoryId" element={<ProductList />} />
            <Route path="/urunler/:productId" element={<ProductDetail />} />
            <Route path="/favorilerim" element={<Favorites />} />
          </Routes>
        </>
      
  );
}

export default App;