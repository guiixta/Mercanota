import MainPadrão from "../components/MainDefault";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Label, Input } from "../components/Formulario";
import { useFetch } from "../hooks/useFetch";
import React, { useEffect, useState } from "react";


export default function ProdutosCriados(){
  const [Lojas, setLojas] = useState([]);
  const [Produtos, setProdutos] = useState([]);

  const {carregando, error, consulta} = useFetch();




  useEffect(() => {

      const BuscarLojas = async () => {

        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'Application/json',
            },
            credentials: 'includes',
        }
        
        const {response, json} = await consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options);
          


          if(response.ok && json.success){
            setLojas(json.dados)
          }

      }

      const BuscarProdutos = async () => {
         const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'Application/json',
            },
            credentials: 'includes',
         }
        
        const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=buscarProdutos', options);
          


        if(response.ok && json.success){
          setProdutos(json.dados)
        } 
      }
    
  });


  return (
    <>

    <Heade />

    <MainPadrão>

          

    </MainPadrão>

    <Footer />

    </>
  );


}
