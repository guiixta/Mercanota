import { useEffect, useState } from "react";

export function useSessaoLogada(){
  const [estaLogado, setEstaLogado] = useState(false);
  const [verificando, setVerificando] = useState(true);


  useEffect(() => {

    const verificar = async () =>{
       try{
        const response = await fetch('http://localhost:8000/src/api/verificarLogin.php', {credentials: 'include'});

        const resultado = await response.json();

        if(resultado.success){
          setEstaLogado(true);
        }else{
          console.log('Sessao nao ativa', resultado.success)
        }

        }catch{
         console.error('falha na comunicação')
        }finally {
          setVerificando(false);
        }
    }

    verificar();
    
  }, []);
  
  return {estaLogado, verificando};
}
