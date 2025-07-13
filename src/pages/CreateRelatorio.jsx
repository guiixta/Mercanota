import Header from '../components/Header.jsx'
import SectionT1Button from '../components/SectionText.jsx'


export default function CreateRelatorio(){
  return(
    <> 
      <Header 
       path="/"
      />
      

      <main className='w-full flex flex-col'>
        <SectionT1Button 
          title="Criando relatorios"
          content="Aqui você vai estar podendo criar seus relatorios de envio! Você pode fazer-los para diversas lojas ao mesmo tempo basta selecionar quais lojas o relatorio criado vai estar englobando."
          backgroundC="bg-stone-500"
          spanColor="text-white"
          button="btn btn-primary"
          border="border-black"
          buttonName="Criar relatório"
        />

        <SectionT1Button 
          title="Não tem loja?"
          content="Antes de criar relatorios você precisa ter uma loja! Crie agora clicando no botão abaixo."
          backgroundC="bg-sky-500"
          spanColor="text-white"
          button="btn btn-secondary"
          border="border-white"
          buttonName="Adicionar Loja"
        />
      </main>  
    </>
  )
}
