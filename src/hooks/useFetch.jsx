import { useCallback, useState } from "react";


export function useFetch(){
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [error, setError] = useState('');

  const consulta = useCallback(async (url, options) => {
    setCarregando(false);

    try{
      const response = await fetch(url, options);

      const json = await response.json();

      if(response.ok){
        setResposta(json);
        return {response, json}
      }else{
        setError(json);
        return {response, json}
      }
    }catch (err){
      setError(err.message);
      return {response: null, json: null}
    }finally{
      setCarregando(false);
    }

  }, []);
  
 
  return {resposta, error, carregando, consulta};
}
