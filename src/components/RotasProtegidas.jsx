import React from "react";
import {useSessaoLogada} from "../hooks/useSessaoLogada.jsx";
import { Navigate } from "react-router";


const ProtectedRouter = ({ children }) => {
  const {estaLogado, verificando} = useSessaoLogada();

  if(verificando){
    return <div>Verificando</div>
  }

  if(!estaLogado){
    return <Navigate to="/" replace/>
  }

  return children;
}

export default ProtectedRouter;
