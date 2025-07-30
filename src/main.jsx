import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import LockScreen from './pages/LockScreen.jsx';
import CreateRelatorio from './pages/CreateRelatorio.jsx'
import CreateProduto from './pages/CreateProduto.jsx';
import RegisterSreen from './pages/Register.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <LockScreen path="/home"/>,
  },

  {
    path: "/cadastro",
    element: <RegisterSreen />
  },

  {
    path: "/home",
    element: <App />,
  },

  {
    path: "/createRelatorio",
    element: <CreateRelatorio />,
  },
  
  {
    path: "/createProduto",
    element: <CreateProduto />
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
