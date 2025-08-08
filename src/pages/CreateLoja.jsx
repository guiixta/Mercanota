import Header from "../components/Header";
import Footer from "../components/Footer";
import {Input, Label} from "../components/Formulario";
import ModalTailwind from "../components/ModalTail";
import '../css/index.css'
import React, { useState } from "react";
import {useFetch} from "../hooks/useFetch";
import MainDefault from "../components/MainDefault";
import { SvgLoading } from "../components/Svgs";


export default function CreateLoja(){ 
    const [nomeLoja, setNomeLoja] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [ShowModal, setShowModal] = useState(false);

    const {carregando, error, consulta} = useFetch();

    const handleCloseModal = () => {
      setShowModal(false);
    }

    async function Cadastre(e){
      e.preventDefault();

      const dados = {
        nomeLoja: nomeLoja,
      };

      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(dados),
      }

      const {response, json} = await consulta('http://localhost:8000/src/api/loja.php?acao=criar', options);

      if(response.ok && json.success){
        setShowModal(true);
        setMensagem(json.status);
      }else{
        setMensagem(json.status);
        console.log(error);
      } 
      

    }
    
    return(
      <>

        <Header />


        {ShowModal && (
            <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              onCloser={handleCloseModal}
              Mensagem={mensagem}
              CloseButtonClass= "btn btn-danger flex-force"
              ButtonTask="Fechar"
              SvgLoading="hidden"
            />
        )}


        <MainDefault titulo="Cadastrar Loja" descricao="Adicione suas lojas para cadastrar seus produtos e relatórios" localVoltar="/home">
              <form method="POST" className="flex flex-col gap-[5px]" onSubmit={Cadastre}> 
                <Label LabelText="Nome:"><span className="text-red-600">*</span></Label>
                <Input placeholder="Digite o nome da loja" typeInput="text" nameInput="nome" valueInput={nomeLoja} onChange={(e) => {setNomeLoja(e.target.value)}} isRequired />
                

                <div className="w-full">
                  <button className="btn btn-primary mt-[10px] flex-force w-full justify-center items-center" type="submit">{carregando ? ( 
                    <>
                      <SvgLoading /> 
                      <span>Criando...</span>
                    </>
                  ) : ('Cria Loja')}
                </button>
              </div>
                
              </form> 
            </MainDefault>

        <Footer />
      </>
    
    );
    
}




