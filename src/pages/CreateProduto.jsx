import Header from "../components/Header";
import Footer from "../components/Footer";
import Section, {Div} from "../components/Section"
import Formulario, {Input, Label} from "../components/Formulario";
import Button from "../components/Button";
import '../css/index.css'
import React from "react";
import { Link } from "react-router-dom";



export default function CreateProduto() {
  return(
    <>
      <Header />
      
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
            <Formulario method="POST" estilosForm="flex flex-col gap-[5px]"> 
              <Label estilosLabel="text-white font-bold" LabelText="Nome:"><span className="text-red-600">*</span></Label>
              <Input estilosInput="bg-stone-500 border border-white text-white font-bold p-[0.5rem] rounded-sm" placeholder="Digite o nome do produto" typeInput="text" nameInput="nome" isRequired />
              
              <Div divClass="LojasContainer flex gap-[5px] w-full">
              </Div>
              <Button buttonClass="btn btn-primary mt-[10px]" buttonType="submit" nomeButton="Criar" />
              
            </Formulario> 
          </Div> 
        </Section>
    </main>

      <Footer /> 
    </>
  )
}
