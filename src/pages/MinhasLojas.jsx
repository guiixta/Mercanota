import React, { useCallback, useEffect, useState } from "react";
import MainPadrão from "../components/MainDefault"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import AvisoVazio from "../components/AvisoVazio"
import Popup from "../components/Popup";
import ModalTailwind from "../components/ModalTail";
import "../css/index.css"

export default function LojasCriadas(){
    const {error, carregando, consulta} = useFetch();
    const [ShowPopup, setShowPopup] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [EditPopup, setEditPopup] = useState(false);
    const [PopupAnimate, setPopupAnimate] = useState('');
    const [idLoja, setIdLoja] = useState('');
    const [mensagemModal, setMensagemModal] = useState('');
    const [NovoNome, setNovoNome] = useState('');
    const [lojas, setLojas] = useState([]);

    const handlerPopup = (idLoja) => {
      setShowPopup(true);
      setPopupAnimate('animate__animated animate__zoomIn');
      setIdLoja(idLoja);
    }

    const handlerEditPoup = (idLoja) =>{
      setNovoNome('');
      setEditPopup(true);
      setPopupAnimate('animate__animated animate__zoomIn');
      setIdLoja(idLoja);
    }

    const handlerClosePopup = () => {
      setPopupAnimate('animate__animated animate__zoomOut')

      setTimeout(() => {
        setShowPopup(false);
        setEditPopup(false);
      }, 500)
    }

    const handleCloseModal = () => {
      setShowModal(false);
    }
    
    const buscarLojas = useCallback(async (signal) => {
      const options = {
        method:'GET', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'Application/json',
        },
        signal: signal,
      }

      const {response, json} = await consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options)

      if(response.ok){
        setLojas(json.dados || []);
      }
      
    }, [consulta]);

    const handlerDelete = useCallback(async (idLoja) => {
  
       const options = {
        method:'GET', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'Application/json',
        },
      }

      const {response, json} = await consulta(`http://localhost:8000/src/api/loja.php?acao=deletarLoja&idLoja=${idLoja}`, options);

      handlerClosePopup();

      if(response.ok && json.success){

        setLojas(prevLojas => (prevLojas.filter(loja => loja.idLoja !== idLoja)));
        

        setTimeout(() => {setShowModal(true);}, 1000);
        setMensagemModal('Loja apagada com sucesso!');
      }


    }, [consulta]);


    const handlerEdit = useCallback(async (idLoja, nomeNovo) => {

      const options = {
        method:'GET', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'Application/json',
        },
      }  

      const {response, json} = await consulta(`http://localhost:8000/src/api/loja.php?acao=editarLoja&idLoja=${idLoja}&nome=${nomeNovo}`, options);

      handlerClosePopup();

      if(response.ok && json.success){
        
        setLojas(prevLojas => prevLojas.map(loja => {
            if(loja.idLoja === idLoja){
              return{
                ...loja,
                nome: nomeNovo
              };
            }
            return loja;
          })

        );

        setTimeout(() => {setShowModal(true);}, 1000);
        setMensagemModal('Nome alterado com sucesso!');
      }


    }, [consulta]);

    
      
    useEffect(() => {
      const controller = new AbortController();

      buscarLojas(controller.signal);

      return () => {
        controller.abort();
      }
    }, [buscarLojas]);


    if(error){
      console.log(error.status)
    }
    

    return (
      <>
        <Header />


        {ShowModal && (
          <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              onCloser={handleCloseModal}
              Mensagem={mensagemModal}
              CloseButtonClass= "btn btn-danger flex-force"
              ButtonTask="Fechar"
              SvgLoading="hidden"
            />
        )}

        {ShowPopup && (
            <Popup Titulo={<><i className='bi bi-exclamation-octagon-fill'></i> AVISO</>} Mensagem="Ao deletar uma loja você está deletando todas as relações que ela está envolvida: produtos e relatórios! Essa ação não pode ser desfeita. Deseja mesmo excluir?" Animacao={PopupAnimate} >
              <div className="flex gap-[5px]">
                <button className="btn btn-danger" onClick={handlerClosePopup}>Cancelar</button>
                <button className="btn btn-success" onClick={() => {handlerDelete(idLoja)}}>Confirmar</button>
              </div>
            </Popup>
          
        )}


        {EditPopup && (
            <Popup Titulo={<>Editar Loja</>} Mensagem="" Animacao={PopupAnimate} >

              <div className="flex flex-col w-full">
                <div>
                  <label htmlFor="nomeNovo" className="text-white mr-[5px]">Novo nome:</label>
                  <input type="text" className="p-[0.1rem] rounded-xl w-auto font-bold border shadow-white bg-stone-500 text-white" id="nomeNovo" placehoder="Novo nome" name="nome" value={NovoNome} onChange={(e) => {setNovoNome(e.target.value)}}  required />
                </div>
                <div className="flex mt-[20px] gap-[5px]">
                  <button className="btn btn-danger" onClick={handlerClosePopup}>Cancelar</button>
                  <button className="btn btn-success" onClick={() => {handlerEdit(idLoja, NovoNome)}}>Confirmar</button>
                </div>
              </div>
              
            </Popup>
        )}

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


          ) } {lojas.length > 0 ? (
            <>
              <div className="flex w-full">
                <ul className="w-full">
                {
                  
                  lojas.map(loja => (
                        <li key={loja.idLoja} className="flex p-[1rem] gap-[10px] text-white border-y w-full items-center justify-center border-neutral-700">
                          <div className="w-[40%] flex justify-start">
                            <span className="font-bold cursor-default text-xl">{`${loja.nome}`}</span>
                          </div>
                          <div className="w-[35%]">
                            <span className="cursor-default text-zinc-800 text-sm">{`Criada em: ${loja.dataCriada}`}</span>
                          </div>
                          <div className="action buttons justify-center items-center flex gap-[2px] w-[25%]"> 
                            <button className="btn btn-danger" title="Excluir" onClick={() => {handlerPopup(loja.idLoja)}}><i className="bi bi-trash"></i></button>
                            <button className="btn btn-secondary" title="Editar" onClick={() => {handlerEditPoup(loja.idLoja)}}><i className="bi bi-pencil-square"></i></button>
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
