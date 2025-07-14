import Header from '../components/Header.jsx'
import Section, {Div} from '../components/Section.jsx'
import Footer from '../components/Footer.jsx'
import CheckboxButtons from '../components/CheckboxBtn.jsx'
import Button from '../components/Button.jsx'
import AvisoVazio from '../components/AvisoVazio.jsx'


export default function CreateRelatorio(){
  return(
    <> 
      <Header 
       path="/Welcome"
      />

      <main className='w-full p-[5rem] pt-[2rem] pb-[2rem] justify-center items-center flex flex-col'>
         
        <Section sectionClass="bg-stone-950 flex flex-col p-[5rem] rounded-xl border border-white gap-[15px] " >
          <Div divClass="Brand w-full flex">
           <h1 className='cursor-default text-white font-bold text-5xl'>Novo Relatorio</h1> 
          </Div>
          <Div divClass="Content">
            <span className="text-white cursor-default text-justify flex">Selecione as lojas para criar relatórios individuais ou diversos ao mesmo tempo</span> 
          </Div>

          <Div divClass="Action flex flex-col w-[50%]">
            <CheckboxButtons 
              NameLoja="Portal"
            />
            <CheckboxButtons 
              NameLoja="Cetag"
            />
          </Div>
          
          <Div divClass="CreateButtonAction flex">
            <Button buttonClass="btn btn-primary" nomeButton="Criar" />
          </Div>

          <Div divClass="AvisoContainer text-white">
            <AvisoVazio 
              CorDeFundo="bg-red-950"
              LarguraAviso="w-[50%]"
              NameAviso="Você não tem lojas"
              Content="Não e possível fazer relatórios sem antes criar uma loja. Clique no botão abaixo e crie suas lojas."
              StyleButton="btn-secondary"
              Action="Criar Loja"
            />          
          </Div>
        </Section>
        
      </main>
      <Footer />
    </>
  )
}
