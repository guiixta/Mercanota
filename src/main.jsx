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
import ProtectedRouter from './components/RotasProtegidas.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LockScreen />,
  },

  {
    path: "/cadastro",
    element: <RegisterSreen />
  },

  {
    path: "/home",
    element: (
      <ProtectedRouter>
        <App />
      </ProtectedRouter>
    ),
  },

  {
    path: "/createRelatorio",
    element: (
      <ProtectedRouter>
        <CreateRelatorio />
      </ProtectedRouter>
    ),
  },
  
  {
    path: "/createProduto",
    element: (
      <ProtectedRouter >
        <CreateProduto />
      </ProtectedRouter>
    ),
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
