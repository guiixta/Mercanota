import React, { useState } from "react";
import '../css/index.css';
import { Link, useNavigate } from "react-router-dom";
import ModalTailwind from "../components/ModalTail";

export default function LockScreen(){

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate('');
  const [mensagem, setMensagem] = useState('');
  const [ShowModal, setShowModal] = useState(false);


  async function Logar(e){
    
    e.preventDefault();
    
    const dados = {
      usuario: usuario,
      senha : senha,
    }


    try{  
      const response = await fetch('http://localhost:8000/src/api/login.php', { 
          method:'POST', 
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dados),
        });

      const resultado = await response.json();

      if (response.ok && resultado.success){
        setShowModal(true);
        setTimeout(() => {navigate('/home', {replace: true})}, 2000);
      }else{
        setMensagem(resultado.status)
      }
    }catch{
      console.log('Falha na conexão');
    }     
    
  }

  return(
    <>

        {ShowModal && (
            <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              Mensagem={`Seja Bem-vindo: ${usuario}`}
              CloseButtonClass= "btn btn-primary flex-force items-center"
              ButtonTask="Entrando..."
              SvgLoading=""
            />
        )}



      <main className="w-screen h-screen flex justify-center items-center">
        <section className="p-[1rem] bg-stone-900 flex rounded-xl border-[0.1rem] border-blue-500 flex-col">
          <div className="Brand w-full mb-[1rem] flex justify-center items-center">
            <h1 className="font-archivoblack text-2xl font-extrabold cursor-default text-blue-500">MERCANOTA</h1>
          </div>
          <div className="Title w-full flex justify-center items-center">
            <span className="text-white font-bold text-xl cursor-default">Login</span>
          </div>
          <div className="Forms p-[1rem]">
            <form  className="flex flex-col gap-[5px]" onSubmit={Logar}>
              <label htmlFor="usuario" className="font-bold text-white">Usuário</label>
              <input type="text" placeholder="Digite seu usuario" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="username" id="usuario" value={usuario} onChange={(e) => {setUsuario(e.target.value)}} required />
              {mensagem && (
                <div className="w-full text-center">
                  <span className="text-red-500 font-bold cursor-default">{`${mensagem}`}</span>
                </div>
              )}
              <label htmlFor="senha" className="font-bold text-white">Senha</label>
              <input type="password" placeholder="Digite sua senha" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="pass" id="senha" value={senha} onChange={(e) => {setSenha(e.target.value)}} required />
              <div className="Cadastro flex w-full py-[10px] justify-center items-center">
                <Link to="/cadastro" className="font-bold text-blue-500 cursor-pointer">Criar usuário</Link>
              </div>
              <div className="Actions flex w-full justify-center items-center">
                <button type="submit" className="btn btn-primary">Entrar</button>
              </div>
            </form>
          </div> 
        </section>
      </main>
    </>
  )
}
