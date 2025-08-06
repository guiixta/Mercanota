import { Link } from "react-router-dom";
import React from "react";

export default function MainPadrão(props){

  return (
    <>
      <main className='w-full p-x[5rem] py-[2rem] justify-center items-center flex flex-col'>
          <section className="bg-stone-950 flex flex-col py-[4rem] px-[5rem] rounded-xl border border-white gap-[15px] " >
            <div className="w-full flex justify-start items-center">
             <Link to={props.localVoltar} className="p-[0.5rem] text-white bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer" title="Voltar"><i className="bi bi-caret-left-fill"></i></Link>
            </div>
            <div className="Brand w-full flex">
             <h1 className='cursor-default text-white font-bold text-5xl'>{props.titulo}</h1> 
            </div>
            <div className="Content">
              <span className="text-white cursor-default text-justify flex">{props.descricao}</span> 
            </div>

            <div className="Action w-full">
              {props.children}
            </div>
          </section>
      </main>
      
    </>

  );  


}
