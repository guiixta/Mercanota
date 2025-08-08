import MainPadrão from "../components/MainDefault";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import React, { useEffect, useState, useMemo } from "react";
import { SvgLoading } from "../components/Svgs"
import AvisoVazio from "../components/AvisoVazio";

export default function ProdutosCriados(){
  const [Lojas, setLojas] = useState([]);
  const [Produtos, setProdutos] = useState([]);
  const [LojasProdutos, setLojasProdutos] = useState([]);

  const {carregando, error, consulta} = useFetch();




  useEffect(() => {
      
    const controller = new AbortController();


    const BuscarDados = async (signal) => {
      try{
        
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
          signal: signal,
        }


        const [lojaFetch, produtoFetch] = await Promise.all([
          consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options),
          consulta('http://localhost:8000/src/api/produto.php?acao=buscarProdutos', options)
        ]);

        if(lojaFetch.response.ok && produtoFetch.response.ok){
          const lojasDados = lojaFetch.json.dados;
          const produtoDados = produtoFetch.json.dados;


          setLojas(lojasDados);
          setProdutos(produtoDados);

          if(lojasDados.length > 0 && produtoDados.length > 0){
            
            const dados = {
              produtos: produtoDados,
            }



            const relacaoOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'Application/json',
              },
              credentials: 'include',
              body: JSON.stringify(dados),
              signal: signal,
            }


            const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=buscarRelacao', relacaoOptions);
            
            console.log(json.status)
            console.log(json.dados)
            console.log(json.success)
            if(response.ok && json.success){
              setLojasProdutos(json.dados);
              console.log(json.dados || json.status)
            }

          }
        }

        


      }catch(error){
        console.log(error)
      } 
    }

 
    BuscarDados(controller.signal);

    return () => {
      controller.abort();
    }
          
  }, [consulta]);


  const lojasMap = useMemo(() => {

    if(Lojas.length === 0){
      return {};
    }

    const map = {};

    Lojas.forEach(loja => {
      map[loja.idLoja] = loja.nome;
    });

    return map;
  }, [Lojas]) 


  if(error){
    console.log(error)
  }

  return (
    <>

    <Header />

    <MainPadrão titulo="Seus Produtos" descricao="Modifique o nome e as lojas que seus produtos pertencem" localVoltar="/home">

      {carregando && (
        <div className="w-full flex">
          <SvgLoading />
          <span>Carregando...</span>
        </div>        

      )} 
      {Lojas.length > 0 ? (
          <>
            <div className="w-full">
              <table>
                           
                <thead className="text-white">
                  <tr>
                    <th>Produtos</th>
                    <th>Lojas</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Produtos.map(produto =>{

                      const relacoesProdutos = LojasProdutos.filter(rel => (rel.FKidProduto === produto.idProduto));

                      const nomeLojas = relacoesProdutos.map(rel => lojasMap[rel.FKidLoja]);


                      return (
                        <tr key={produto.idProduto} className="text-white cursor-default">
                          <td>{produto.nome}<i className="bi bi-info-circle-fill" title={`Criado em: ${produto.dataCriada}`}></i></td>
                          <td>{nomeLojas.join(', ')}</td>
                          <td>
                            <button className="btn btn-danger"><i className="bi bi-trash-fill"></i></button>
                            <button className="btn btn-secondary"><i className="bi bi-pencil-square"></i></button>
                          </td>
                        </tr>

                      );



                    })
    
                  } 
                </tbody>
                                
              </table>
            </div>
            
          </>
        ) : (
          <>
            <div className="w-full flex">
              <AvisoVazio
                ClassNameContainer="bg-red-800 w-full text-white"
                NameAviso="Você ainda não criou lojas"
                Content="Nenhuma loja foi criada ainda, clique no botão abaixo para criar sua primeira loja"
                StyleButton="btn-secondary"
                Action="Ir criar loja"
                Path="/createLoja" 
              />
            </div>
          </>
        )
      }

    </MainPadrão>

    <Footer />

    </>
  );


}
