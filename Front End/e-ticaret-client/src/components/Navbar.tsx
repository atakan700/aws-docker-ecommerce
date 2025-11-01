import "../index.css"
import { Link } from 'react-router-dom';
import './Navbar.css'; // stil dosyası istersen buradan düzenle
import HamburgerComponent from './HamburgerMenu.tsx';

const user={
  
  name:'/veritaabnı/doğrulanmış/Name',
  imageurl:'./src/assets/Carousel/carousel1.png',
  imageSize:90,
}


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
        className="rounded-circle" 
         src={user.imageurl} 
         alt={'Photo of'+user.name}
         style={{
          width:user.imageSize,
          height:user.imageSize
         }}
          />
          <h2>{user.name } bey hoşgeldiniz</h2>
      
      </div>

      
        <ul className="nav-links">
          <HamburgerComponent/>
          
          
          <div> <a href="" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/user.png" alt="Giriş yap" className="social-icon" /> </a>
          <li><Link to="/">Giriş Yap</Link></li>
          </div>

          <div> <a href="" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/love.png" alt="Giriş yap" className="social-icon" /> </a>
          <li><Link to="/favoriler">Favorilerim</Link></li>
          </div>
           
          <div> <a href="" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/bag.png" alt="Giriş yap" className="social-icon" /> </a>
          <li><Link to="/sepetim">kutu</Link></li>
          </div>
          
          
        </ul>
      

    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <form className="d-flex">
          <input type="search" className="form-control me-2 navbar-input"  placeholder="Ürün veya kategori arayınız." aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Ara</button>
        </form>
      </div>
    </nav>
      
      <div className="navbar-right">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/facebook.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/twitter.png" alt="Twitter" className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="./src/assets/Navbar/instagram.png" alt="Instagram" className="social-icon" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
