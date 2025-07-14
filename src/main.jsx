import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import LockScreen from './LockScreen.jsx';
import CreateRelatorio from './pages/CreateRelatorio.jsx'
import CreateProduto from './pages/CreateProduto.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LockScreen path="/Welcome"/>,
  },

  {
    path: "/Welcome",
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
