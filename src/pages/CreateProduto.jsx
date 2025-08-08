import Header from "../components/Header";
import Footer from "../components/Footer";
import {Label, Input} from "../components/Formulario";
import '../css/index.css'
import React, { useEffect, useState } from "react";
import {useFetch} from "../hooks/useFetch";
import ModalTailwind from "../components/ModalTail";
import MainDefault from "../components/MainDefault";
import {SvgLoading} from "../components/Svgs";
import AvisoVazio from "../components/AvisoVazio";





export default function CreateProduto() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [ShowModal, setShowModal] = useState(false);
  const [Lojas, setLojas] = useState([]);
  const [Mensagem, setMensagem] = useState('');
  const [CreateLoading, setCreateLoading] = useState(false);
  const [LojasSelecionadas, setLojasSelecionadas] = useState([]);
  const [StatusModal, setStatusModal] = useState('');
  
  const {carregando, error, consulta} = useFetch();

  // Functions Modal {

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // }

  // Function para criar um array das lojas selecionadas nos checkbox
  const handlerSelecaoLojas = (idLoja) => {
    // Retorna true caso o valor (idLoja) exista dentro do array
    if(LojasSelecionadas.includes(idLoja)){
        // Atualiza o valor do array, deixando somente os valores que retornam true para a condição (id !== idLoja), Logo o unico que ira retornar false para "diferente de (!==)" será o valor igual. 
        setLojasSelecionadas(LojasSelecionadas.filter(id => (id !== idLoja)));
    }else{
      // Mantém o estado anterior e incrementa o novo
      setLojasSelecionadas([...LojasSelecionadas, idLoja])
    }
  }

  useEffect(() => {

    const controller = new AbortController();

    const BuscarLojas = async () => {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
          signal: controller.signal,
        }

        const {response, json} = await consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options);
        
        if(response.ok && json.success){
          setLojas(json.dados);
        }

    }

    BuscarLojas();

    return () => {
      controller.abort()
    }
  }, [consulta]) 

  async function CriarProduto(e){
    e.preventDefault();
      

    if(LojasSelecionadas.length === 0){

      setShowModal(true);

      setTimeout(() => {setShowModal(false);}, 2000)
      setStatusModal('Error')
      setMensagem("Você deve selecionar pelo menos uma loja!")

      return;
    }

    const dados = {
      nomeProduto: nomeProduto,
      lojas: LojasSelecionadas,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dados),
    }

    setCreateLoading(true);
    
    const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=criar', options);

    if(response.ok && json.success){
      setShowModal(true);
      
      setTimeout(() => {setShowModal(false)}, 2000)

      setMensagem(json.status);
      setStatusModal('Sucesso!')
      setCreateLoading(false);
      console.log('Produto cadastrado com sucesso.')
    }else{
      console.log(error)
    }
  } 


  return(
    <>
      <Header />
      
      {ShowModal && (
        <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= {StatusModal}
              onCloser={handleCloseModal}
              Mensagem={Mensagem}
              CloseButtonClass= "btn btn-danger flex-force"
              ButtonTask="Fechar"
              SvgLoading="hidden"
            />      
      )}
        <MainDefault titulo="Cadastrar Produto" descricao="Adicione seus produtos para suas lojas!" localVoltar="/home">

           
            
          {carregando && ( 
            <>
              <div className="flex w-full">
                <SvgLoading /> 
                <span className="cursor-default font-bold text-white">Carregando...</span>
              </div>
            </> 
          )} 
          
          {Lojas.length > 0 ? (
            <div className="w-full">
              <form method="POST" onSubmit={CriarProduto}>
                <div className="LojasContainer py-[1rem] mb-[10px] border-y border-stone-700">
                  <span className="text-white font-bold cursor-default text-xl">Suas Lojas:</span>
                  {
                    Lojas.map(loja => (
                      <div key={loja.idLoja} className="flex">
                        <input type="checkbox" id={loja.idLoja} value={loja.idLoja} onChange={() => {handlerSelecaoLojas(loja.idLoja)}} />
                        <label className="text-white font-bold cursor-default ml-[2px]" htmlFor={loja.idLoja}>{loja.nome}</label>
                      </div>
                    ))
                  }
                </div>
                <div className="w-full flex flex-col mb-[10px]">
                  <Label LabelText="Nome:"><span className="text-red-600">*</span></Label>
                  <Input typeInput="text" nameInput="Nome" placeholder="Digite o nome do Produto" valueInput={nomeProduto} onChange={(e) => {setNomeProduto(e.target.value)}}   required />
                </div>

                <div className="ButtonContainer w-full">
                  <button className="w-full btn btn-primary flex-force justify-center items-center" type="submit">{
                    CreateLoading ? (
                      <>
                        <SvgLoading />
                        <span>Criando...</span>
                      </>
                    ) : ('Criar Produto')
                  }</button>
                </div>
              </form>
            </div>

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

          )}
              
        </MainDefault>
        <Footer /> 
    </>
  )
}
