import React, { useEffect } from "react";
import MainPadrão from "../components/MainDefault"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import AvisoVazio from "../components/AvisoVazio"

export default function LojasCriadas(){
    const {resposta, error, carregando, consulta} = useFetch();
    
    
      
    useEffect(() => {
      const options = {
        method:'GET', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'Applicantion/json',
        },
      }

      const buscaLojas = async () => {
        await consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options)
      }

      buscaLojas();
    }, [consulta]);


    if(error){
      console.log(error.status)
    }

    return (
      <>
        <Header />

        <MainPadrão titulo="Lojas Existentes" descricao="Aqui você pode ver e gerenciar suas lojas já criadas, editar e apagar lojas!" localVoltar="/home">
          {carregando && ( 
            <>
              <div className="flex w-full">
                <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="40"
                    strokeDashoffset="20"
                  />
                </svg> 
                <span className="cursor-default font-bold text-white">Carregando...</span>
              </div>
            </>


          ) } {resposta.dados && resposta.dados.length > 0 ? (
            <>
              <div className="flex w-full">
                <ul>
                {
                  
                  resposta.dados.map(loja => (
                        <li key={loja.idLoja} className="flex p-[1rem] gap-[10px] text-white border-y items-center justify-center border-neutral-700">
                          <span>{`${loja.nome}`}</span>
                          <span>{`Criada em: ${loja.dataCriada}`}</span>
                          <div className="action buttons flex gap-[2px]"> 
                            <button className="btn btn-danger"><i className="bi bi-trash"></i>Excluir</button>
                            <button className="btn btn-secondary"><i className="bi bi-pencil-square"></i>Editar</button>
                          </div>
                        </li>
                  ))
                }
                </ul>
              </div>
            </>
          ) : (
              <>
                <div className="flex w-full justify-center items-center">
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
            ) }
        </MainPadrão>

        <Footer />
      </>


    );


}
