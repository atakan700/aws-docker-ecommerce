import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AlertProvider } from './context/AlertContext.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
     <AlertProvider>
      <App />
    </AlertProvider>
  </>,
)