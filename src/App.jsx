import React from 'react'
import Header from './components/Header.jsx'
import ItemMenu from './components/Menus.jsx'
import Footer from './components/Footer.jsx'
import Section, {Div} from './components/Section.jsx'


function App() { 
  return (
    <>
      <Header />
    
      <main className='CurrentMain w-full flex mt-[1rem] justify-center items-center'>
        <Section sectionClass='flex flex-col gap-[20px] justify-start items-start'>
          <Div divClass="Relatorios w-full">

            <Div divClass="Brand w-full mb-[1rem]">
              <span className='text-white font-bold cursor-default text-2xl'>Relatórios</span>
              <span className='h-px block w-full bg-white'></span>
            </Div>

            <Div divClass="ContainerList overflow-x-auto overflow-y-hidden flex gap-[5px] flex-nowrap px-[4px] py-[4px] items-center max-w-md">
              <ItemMenu
                Icon="bi bi-card-text"
                Name="Criar relatório"
                path="/createRelatorio"
              />
              <ItemMenu
                Icon="bi bi-eye-fill"
                Name="Ver relatórios"
              />
            </Div>
          </Div>

          <Div divClass="Produtos w-full">
            <Div divClass="Brand w-full mb-[1rem]">
              <span className='text-white font-bold cursor-default text-2xl'>Produtos</span>
              <span className='h-px block w-full bg-white'></span>
            </Div>

            <Div divClass="ContainerList overflow-x-auto overflow-y-hidden flex flex-nowrap gap-[5px] px-[4px] pb-[15px] pt-[10px] items-center max-w-md">
              <ItemMenu
                Icon="bi bi-cart-plus-fill"
                Name="Adicionar produto"
                path="/createProduto"
              />

              <ItemMenu
                Icon="bi bi-cart-check-fill"
                Name="Produtos criados"
              />

              <ItemMenu
                Icon="bi bi-sliders"
                Name="Criar Atributos"
              />

              <ItemMenu
                Icon="bi bi-pencil-square"
                Name="Gerenciar Atributos"
              />
            </Div>
          </Div>
          <Div divClass="Lojas w-full">
            <Div divClass="Brand w-full mb-[1rem]">
              <span className='text-white font-bold cursor-default text-2xl'>Lojas</span>
              <span className='h-px block w-full bg-white'></span>
            </Div>
            <Div divClass="ContainerList overflow-x-auto overflow-y-hidden flex flex-nowrap gap-[5px] px-[4px] pb-[15px] pt-[10px] items-center max-w-md">
               <ItemMenu
                Icon="bi bi-shop-window"
                Name="Criar Loja"
                path="/createLoja"
               />

               <ItemMenu
                Icon="bi bi-buildings-fill"
                Name="Gerenciar Lojas"
                path="/userLojas"
               />
            </Div>
          </Div>
          
          
        </Section> 
      </main>

      <Footer />
    </>
  )
}

export default App
