import "./Carousel.css"
const images = import.meta.glob('/src/assets/Carousel/carousel*.png', { eager: true });

const imageList = Object.values(images).map((mod: any) => mod.default);
console.log('imageList:', imageList);

function Carousel() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
    <div className="carousel-inner">
      {imageList.map((src, index) => (
        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
          <img src={src} className="d-block w-100" alt={`slide-${index}`} />
        </div>
        
      ))}
      </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>

      
    </div>
  );
}

export default Carousel;
