import Header from "../components/Header";
import Footer from "../components/Footer";
import Section, {Div} from "../components/Section"
import Formulario, {Input, Label} from "../components/Formulario";
import ModalTailwind from "../components/ModalTail";
import '../css/index.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useFetch} from "../hooks/useFetch";


export default function CreateLoja() {
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

      const {response, json} = await consulta('http://localhost:8000/src/api/createLoja.php', options);

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


        <main className='w-full p-[5rem] pt-[2rem] pb-[2rem] justify-center items-center flex flex-col'>
          <Section sectionClass="bg-stone-950 flex flex-col pt-[4rem] pb-[4rem] pr-[5rem] pl-[5rem] rounded-xl border border-white gap-[15px] " >
            <Div divClass="w-full flex justify-start items-center">
             <Link to={"/home"} className="p-[0.5rem] text-white bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer" title="Voltar"><i className="bi bi-caret-left-fill"></i></Link>
            </Div>
            <Div divClass="Brand w-full flex">
             <h1 className='cursor-default text-white font-bold text-5xl'>Novo Produto</h1> 
            </Div>
            <Div divClass="Content">
              <span className="text-white cursor-default text-justify flex">{'Cadastre o seus produtos aqui, adicione ele a uma loja!'}</span> 
            </Div>

            <Div divClass="Action flex flex-col w-full">
              <Formulario method="POST" estilosForm="flex flex-col gap-[5px]" onSubmit={Cadastre}> 
                <Label estilosLabel="text-white font-bold" LabelText="Nome:"><span className="text-red-600">*</span></Label>
                <Input estilosInput="bg-stone-500 border border-white text-white font-bold p-[0.5rem] rounded-sm" placeholder="Digite o nome da loja" typeInput="text" nameInput="nome" valueInput={nomeLoja} onChange={(e) => {setNomeLoja(e.target.value)}} isRequired />
                
                <button className="btn btn-primary mt-[10px] flex-force" type="submit">{carregando ? ( 
                  <>
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
                    <span>Criando...</span>
                  </>
                ) : ('Cria Loja')}
              </button>
                
              </Formulario> 
            </Div> 
          </Section> 
        </main>

        <Footer />
      </>
    
    );
    
}





