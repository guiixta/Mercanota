import Header from "../components/Header";
import Footer from "../components/Footer";
import Section, {Div} from "../components/Section"
import Formulario, {Input, Label, Select} from "../components/Formulario";
import Button from "../components/Button";
import '../css/index.css'

const OptionsMateiral = [

  {
    value: "suplex",
    name: "Suplex",
  },

  {
    value: "poliamida",
    name: "Poliamida",
  },

]

const OptionsTamanhos = [
  {
    value: "p",
    name: "P",
  },

  {
    value: "m",
    name: "M",
  },

  {
    value: "g",
    name: "G",
  },

  {
    value: "gg",
    name: "GG",
  },

  {
    value: "exg",
    name: "EXG",
  },
]

export default  function CreateProduto() {
  return(
    <>
      <Header 
        path="/Welcome"
      />
      
      <main className='w-full p-[5rem] pt-[2rem] pb-[2rem] justify-center items-center flex flex-col'>
        <Section sectionClass="bg-stone-950 flex flex-col p-[5rem] rounded-xl border border-white gap-[15px] " >
          <Div divClass="Brand w-full flex">
           <h1 className='cursor-default text-white font-bold text-5xl'>Novo Produto</h1> 
          </Div>
          <Div divClass="Content">
            <span className="text-white cursor-default text-justify flex">{'As propiedades do produto são customizaveis, basta acessar CreateProduto.jsx em Pasta-Mercanota>src>pages>CreateProduto.jsx'}</span> 
          </Div>

          <Div divClass="Action flex flex-col w-full">
            <Formulario method="POST" estilosForm="flex flex-col gap-[5px]"> 
              <Label estilosLabel="text-white font-bold" LabelText="Nome:"></Label>
              <Input estilosInput="bg-stone-500 border border-white text-white font-bold p-[0.5rem] rounded-sm" placeholder="Digite o nome do produto" typeInput="text" nameInput="nome" isRequired />

              <Label estilosLabel="text-white font-bold" LabelText="Material:"></Label>    
              <Select id="" name="mateiral" options={OptionsMateiral} estilosSelect="text-white p-[0.5rem] bg-stone-500 rounded-sm border-white border font-bold" placeholder="" />
              
              <Label estilosLabel="text-white font-bold" LabelText="Tamanho:"></Label>     
              <Select id="" name="mateiral" options={OptionsTamanhos} estilosSelect="text-white p-[0.5rem] bg-stone-500 rounded-sm border-white border font-bold" placeholder="" /> 

              <Label estilosLabel="text-white font-bold" LabelText="Valor:"></Label>
              <Input estilosInput="bg-stone-500 border border-white text-white font-bold p-[0.5rem] rounded-sm" typeInput="number" nameInput="valor" placeholder="Digite o valor do produto" isRequired />
              
              
              <Button buttonClass="btn btn-primary mt-[10px]" buttonType="submit" nomeButton="Criar" />
              
            </Formulario> 
          </Div> 
        </Section>
    </main>

      <Footer /> 
    </>
  )
}
