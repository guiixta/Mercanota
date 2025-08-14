import MainPadrão from "../components/MainDefault";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import React, { useEffect, useState, useMemo } from "react";
import { SvgLoading } from "../components/Svgs"
import AvisoVazio from "../components/AvisoVazio";
import Popup from "../components/Popup"; 

export default function ProdutosCriados(){
  const [Lojas, setLojas] = useState([]);
  const [Produtos, setProdutos] = useState([]);
  const [LojasProdutos, setLojasProdutos] = useState([]);
  const [ShowPoup, setShowPoup] = useState(false);
  const [Animate, setAnimate] = useState('');
  const [idLojaRecebido, setIdLojaRecebido] = useState('');
  const [idProdutoRecebido, setIdProdutoRecebido] = useState('');
  

  const {carregando, error, consulta} = useFetch();

  
  // Functions do Popup & Modal {
    const handlerPopupOpen = (idLoja, idProduto) => {
      setShowPoup(true)
      setIdLojaRecebido(idLoja);
      setIdProdutoRecebido(idProduto);
      setAnimate('animate__animated animate__zoomIn')
    }

    const handlerPopupClose = () => {
      setAnimate('animate__animated animate__zoomOut')
      setTimeout(() => {setShowPoup(false)}, 500)
    }


    const ActionPoup = (acao) => {

      handlerPopupClose()
        
      switch(acao){
          case "Adicionar":
            return (
              <>
                <Popup Titulo="" Descricao="" Animacao{Animate}>
                  <div className="Content w-full flex flex-col">
                    
                    <form method="POST" onSubmit={}>
                      <div>
                        <select name="Lojas">
                          {
                            const ProdutoSelecionado = Produtos.filter(produto =>(idProdutoRecebido == produto.idProduto)
                            const LojasDoProduto = ProdutoSelecionado.map(produto => lojasMap[produto.FKidLoja]));

                            LojasDoProduto.map((loja, index) => (
                              <option key={index} value="">{loja}</option>
                            ))
                            

                          }
                        </select>
                      </div>
                      <div className="w-full">
                        <button className="btn btn-success" type="submit">Adicionar</button>
                      </div>
                    </form>
                    <div className="Exit w-full">
                      <button className="btn btn-danger">Fechar</button>
                    </div>
                  </div>
                </Popup>

              </>
            )
          break;



          case "Excluir":
            return (
              <>


              </>
            )
          break;


          case "Editar":
            return (
              <>


              </>
            )
          break;





          default:
          break;

      }      

    }
  // }


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


          setLojas(lojasDados || []);
          setProdutos(produtoDados || []);

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
            
            
            if(response.ok && json.success){
              setLojasProdutos(json.dados);
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

    if(!Lojas || Lojas.length === 0){
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


    {ShowPoup && (
      <>
        <Popup Animacao={Animate} Titulo="Editar Produto">
          <div className="flex flex-col w-[20rem]">
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm" onClick={() => {ActionPoup("Adicionar")}}>
              <span className="cursor-default text-white cursor-pointer">Adicionar a Loja</span>  
            </div>
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm">
              <span className="cursor-default text-white cursor-pointer">Remover da loja</span>  
            </div>
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm">
              <span className="cursor-default text-white cursor-pointer">Mudar Nome</span>  
            </div>
            <div className="w-full mt-[10px]">
              <button className="w-full btn btn-danger" onClick={handlerPopupClose}>Fechar</button>
            </div>
          </div>
        </Popup>
      </>

    )
    }

    
    <MainPadrão titulo="Seus Produtos" descricao="Modifique o nome e as lojas que seus produtos pertencem" localVoltar="/home">

      {carregando && (
        <div className="w-full flex">
          <SvgLoading />
          <span>Carregando...</span>
        </div>        

      )} 
      {Lojas.length > 0 ? (
          <>
            <div className="w-full overflow-y-scroll overflow-x-hidden max-h-[20rem]">
              <table className="w-full border-separate border-spacing-2 border border-white">
                           
                <thead className="text-white cursor-default">
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
                      <tr key={produto.idProduto} className="text-white cursor-default bg-zinc-900 even:bg-zinc-800">
                        <td className="align-middle p-1">
                            <div className="flex justify-center items-center gap-[5px]">
                              {produto.nome}<i className="bi bi-info-circle-fill" title={`Criado em: ${produto.dataCriada}`}></i>
                            </div>
                          </td>
                          <td className="text-center align-middle p-1">{nomeLojas.join(', ')}</td>
                          <td className="align-middle">
                            <div className="flex justify-center items-center p-1 gap-[5px]">
                              <button className="btn btn-danger"><i className="bi bi-trash-fill"></i></button>
                              <button className="btn btn-secondary" onClick={handlerPopupOpen}><i className="bi bi-pencil-square"></i></button>
                            </div>
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
