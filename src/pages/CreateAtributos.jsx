import React, { useCallback, useEffect, useState } from "react"
import Header from "../components/Header"
import MainDefault from "../components/MainDefault"
//import Footer from "../components/Footer"
import {Input, Label} from "../components/Formulario"

import {useFetch} from "../hooks/useFetch";
import ModalTailwind from "../components/ModalTail"
import { SvgLoading } from "../components/Svgs"

export default function CreateAtributos(){
  const [nomeGrupo, setNomeGrupo] = useState('');

  const [ShowModal, setShowModal] = useState(false);
  const [Mensagem, setMensagem] = useState('');

  const [Grupos, setGrupos] = useState([]);
  const [Atributos, setAtributos] = useState([]);

  const {carregando, error, consulta} = useFetch();


  //function Modal e Popups {
  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  //}

  const CreateGrupo = useCallback(async (e, nome) => {
    e.preventDefault();


    try{

      const dados = {
        nomeGrupo: nome
      }


      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dados)
      }
      
      const {response, json} = await consulta('http://localhost:8000/src/api/atributo.php?acao=criarGrupo', options);

      if(response.ok && json.success){
        setShowModal(true);
        setNomeGrupo('');
        setTimeout(() => {location.reload()}, 1000) 
        setMensagem(json.status);
      }else{
        console.log(json.status);
      }

    }catch{
      alert('Falha ao criar grupo.');
    }


  }, [consulta])


  useEffect(() => {

    const controller = new AbortController();


    const BuscarDados = async () => {


      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
      }
      

      const [GrupoFetch] = await Promise.all([
        consulta('http://localhost:8000/src/api/atributo.php?acao=buscarGrupos', options)
      ])

      if(GrupoFetch.response.ok && GrupoFetch.json.success){
        const GruposDados = GrupoFetch.json.dados;

        setGrupos(GruposDados || []);
        setAtributos([]);

      }
    }

    BuscarDados();

    return () => {
      controller.abort()
    }

  }, [consulta])


  if(error){
    console.error(error);
  }


  return(
    <>
      <Header />


      {ShowModal && (
        <>
          <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              onCloser={handleCloseModal}
              Mensagem={Mensagem}
              CloseButtonClass= "btn btn-danger flex-force"
              ButtonTask="Fechar"
              SvgLoading="hidden"
          /> 
        </>
      )
      }

      <MainDefault titulo="Atributos" descricao="Crie grupos de atributos para abrigar as caracteristicas do seus produtos." localVoltar="/home">
        <div className="Grupo bg-neutral-900 p-6 rounded-xl">
          <div className="Brand mb-[20px]">
            <h1 className="text-white cursor-default font-bold text-4xl">Criar um grupo</h1>
          </div>
          <div>
            <form className="flex flex-col gap-[10px]" onSubmit={(e) => {CreateGrupo(e, nomeGrupo)}}>

              <Label LabelText={<>Nome do grupo:<span className="text-red-600">*</span></>} htmlFor="nomeGrupo" />
              <Input typeInput="text" valueInput={nomeGrupo} idInput="nomeGrupo" onChange={(e) => {setNomeGrupo(e.target.value)}} isRequired={true} placeholder="Digite o nome do grupo" />

              <div className="w-full">
                <button className=" w-full btn btn-primary flex-force justify-center items-center" type="submit">
                  {carregando ? (
                    <>
                      <SvgLoading />
                        Criar
                    </>
                  ) : (
                    <>
                      Criar
                    </>
                  )
                    

                  }
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="Grupos-Criados mt-[20px]">
          {carregando && (
            <div className="w-full h-full">
                <SvgLoading />
                <span className="text-white cursor-default text-3xl">Carragando</span>
            </div>
          )
          }
          {Grupos.length > 0 ? (
            <>
              <div className="gruposWrappers flex flex-col gap-[5px] overflow-y-scroll overflow-x-hidden max-h-[25rem]">
                <h1 className="text-3xl text-white cursor-default font-bold mb-[10px]">Seus Grupos: </h1>
                {Grupos.map(grupo => (
                    <div key={grupo.idGrupo} className="p-3 bg-neutral-900 rounded-sm flex justify-between items-center w-full text-white">
                      <span className="font-bold cursor-default text-2xl">{grupo.nome} <i title={`Criado em: ${grupo.dataCriada}`} className="bi bi-info-circle-fill text-base ml-[2px]"></i></span>
                      <div>
                        <button title="Criar Atributo" className="rounded-[100%] bg-neutral-900 transition hover:bg-neutral-950 cursor-pointer p-[5px]"><i className="bi bi-plus-lg"></i></button>
                        {Atributos.length > 0 ? (
                          <button className="rounded-[100%] bg-neutral-900 transition hover:bg-neutral-950 cursor-pointer p-[5px]"><i className="bi bi-chevron-down"></i></button> 
                        ) : null
                        }
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <> 
              <div className="w-full">
                <span>Você ainda não criou nenhum grupo</span>
              </div>
            </>
          )

          }
        </div>          
      </MainDefault>

      </>



  )

    
  

}
