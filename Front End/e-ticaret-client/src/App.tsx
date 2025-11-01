import { Routes, Route } from 'react-router-dom';
import Logreg from './pages/LoginRegister';
import Navbar from './components/Navbar';
import Categories from './pages/Categories'
import Category from './pages/admin/CategoryManagement';


function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Logreg />} />
      <Route path="/Kategori" element={<Categories/>} /> 
      <Route path="/admin/Category" element={<Category/>}/>   
    </Routes>

    </>

  );
}

export default App;
