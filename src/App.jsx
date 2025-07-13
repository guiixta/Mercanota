import React from 'react'
import Header from './components/Header.jsx'
import ItemMenu from './components/Menus.jsx'


function App() { 
  return (
    <>
      <Header />
    
      <main className='CurrentMain w-full flex mt-[1rem] justify-center items-center'>
        <section className='flex flex-wrap flex-row gap-[20px] justify-center items-center'>
          <ItemMenu
            Icon="bi bi-card-text"
            Name="Criar relatório"
            path="/createRelatorio"
          />
          <ItemMenu
            Icon="bi bi-eye-fill"
            Name="Ver relatórios"
          />
          <ItemMenu
            Icon="bi bi-cart-plus-fill"
            Name="Adicionar produto"
          />
          <ItemMenu
            Icon="bi bi-cart-check-fill"
            Name="Produtos criados"
          />
        </section> 
      </main>
    </>
  )
}

export default App
