import React, { useState } from "react"
import Header from "../components/Header"
import MainDefault from "../components/MainDefault"
import Footer from "../components/Footer"
import {Input, Label} from "../components/Formulario"

export default function CreateAtributos(){
  const [nomeGrupo, setNomeGrupo] = useState('')


  return(
    <>
      <Header />


      <MainDefault titulo="Atributos" descricao="Crie grupos de atributos para abrigar as caracteristicas do seus produtos." localVoltar="/home">
        <div className="Grupo bg-neutral-900 p-6 rounded-xl">
          <div className="Brand mb-[20px]">
            <h1 className="text-white cursor-default font-bold text-4xl">Criar um grupo</h1>
          </div>
          <div>
            <form className="flex flex-col gap-[10px]">

              <Label LabelText={<>Nome do grupo:<span className="text-red-600">*</span></>} htmlFor="nomeGrupo" />
              <Input typeInput="text" valueInput={nomeGrupo} idInput="nomeGrupo" onChange={(e) => {setNomeGrupo(e.target.value)}} isRequired={true} placeholder="Digite o nome do grupo" />

              <div className="w-full">
                <button className=" w-full btn btn-primary flex-force justify-center items-center">Criar</button>
              </div>
            </form>
          </div>
        </div>
      </MainDefault>

      <Footer />
    </>



  )

    
  

}
