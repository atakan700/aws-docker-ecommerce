import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Product from './components/Products/Products';
import Users from './components/Users';
import Orders from './components/Orders';
import Categories from './components/Categories/Categories';
import { AlertProvider } from './context/AlertContext';




function App() {
  return (
    <AlertProvider>
      <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kategoriler" element={<Categories />} />
            <Route path="/urunler" element={<Product />} />
            <Route path="/kullanicilar" element={<Users />} />
            <Route path="/siparisler" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
    </AlertProvider>
  )
}

export default App;
