import React from "react";
import '../css/index.css';
import { Link } from "react-router-dom";

export default function LockScreen({path}){
  return(
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <section className="p-[1rem] bg-stone-900 flex rounded-xl border-[0.1rem] border-blue-500 flex-col">
          <div className="Brand w-full mb-[1rem] flex justify-center items-center">
            <h1 className="font-archivoblack text-2xl font-extrabold cursor-default text-blue-500">MERCANOTA</h1>
          </div>
          <div className="Title w-full flex justify-center items-center">
            <span className="text-white font-bold text-xl cursor-default">Login</span>
          </div>
          <div className="Forms p-[1rem]">
            <form  className="flex flex-col gap-[5px]" action="">
              <label htmlFor="usuario" className="font-bold text-white">Usuário</label>
              <input type="text" placeholder="Digite seu usuario" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="username" id="usuario" required />

              <label htmlFor="senha" className="font-bold text-white">Senha</label>
              <input type="password" placeholder="Digite sua senha" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="pass" id="senha" required />

            </form>
          </div>
          <div className="Cadastro flex w-full py-[10px] justify-center items-center">
            <Link to="/cadastro" className="font-bold text-blue-500 cursor-pointer">Criar usuário</Link>
          </div>
          <div className="Actions flex w-full justify-center items-center">
            <Link to={path} type="submit" className="btn btn-primary">Entrar</Link>
          </div>
        </section>
      </main>
    </>
  )
}
