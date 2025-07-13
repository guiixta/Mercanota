import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import CreateRelatorio from './pages/CreateRelatorio.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/createRelatorio",
    element: <CreateRelatorio />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
