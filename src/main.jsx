import { createRoot } from 'react-dom/client'
import './main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import LockScreen from './pages/LockScreen.jsx';
import CreateProduto from './pages/CreateProduto.jsx';
import RegisterSreen from './pages/Register.jsx';
import ProtectedRouter from './components/RotasProtegidas.jsx';
import CreateLoja from './pages/CreateLoja.jsx';
import LojasCriadas from './pages/userLojas.jsx';
import ProdutosCriados from './pages/userProdutos.jsx';


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
    path: "/createProduto",
    element: (
      <ProtectedRouter >
        <CreateProduto />
      </ProtectedRouter>
    ),
  },
  {
    path: "/createLoja",
    element: (
      <ProtectedRouter>
        <CreateLoja />
      </ProtectedRouter>
    ),
  },
  {
    path: "/userLojas",
    element: (
      <ProtectedRouter>
        <LojasCriadas />
      </ProtectedRouter>

    ),
  },
  {
    path: "/userProdutos",
    element: (
      <ProtectedRouter>
        <ProdutosCriados />
      </ProtectedRouter>
    ),
  },


]);


createRoot(document.getElementById('root')).render(  
      <RouterProvider router={router} />
)
