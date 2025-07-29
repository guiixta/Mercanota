import React, { useState  } from "react";
import "../css/index.css";
import { Link, useNavigate } from "react-router-dom";
import ModalTailwind from "../components/ModalTail";





export default function RegisterSreen() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();



  const handlerModal = () => {
    navigate('/');     
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  async function CadastrandoUsuario(event){
    event.preventDefault();
    setMensagem('');
    
    const dados = {
      usuario: usuario,
      senha: senha,
    }
    
    try{
      const response = await fetch ('http://localhost:8000/src/api/cadastro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(dados),
      });
      
      const resultado = await response.json();
      if (response.ok && resultado.success){
         
        console.log ('Usuário criado com sucesso', resultado);

        setMensagemSucesso(resultado.status);
        setShowModal(true);

      }else{
          console.log ('Falha ao criar usuario')
          setMensagem(resultado.status);
        }

      }catch (error){
      console.error('Ocorreu um erro:', error);
    }

    
  }

  return (
    <>

      {showModal && (
            <ModalTailwind 
              ClassName= "bg-black border border-white fade show"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              onCloser={handleCloseModal}
              onConfirm={handlerModal}
              Mensagem= {mensagemSucesso}
              CloseButtonClass= "btn btn-danger"
              ConfirmButtonClass= "btn btn-success" 
            />
      )}
      

      <main className="w-screen h-screen flex justify-center items-center">
        <section className="p-[1rem] bg-stone-900 flex rounded-xl border-[0.1rem] border-blue-500 flex-col">
          <div className="Brand w-full flex mb-[1rem] justify-center items-center">
            <h1 className="font-archivoblack text-2xl font-extrabold cursor-default text-blue-500">MERCANOTA</h1>
          </div>
          <div className="Title w-full flex justify-center items-center">
            <span className="text-white font-bold text-xl cursor-default">Cadastro</span>
          </div> 
          <div className="Forms p-[1rem]">
            <form  className="flex flex-col gap-[5px]" onSubmit={CadastrandoUsuario}>
              <label htmlFor="usuario" className="font-bold text-white">Usuário</label>
              <input type="text" placeholder="Crie seu Usuário" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="username" id="usuario" value={usuario} onChange={(event) => {setUsuario(event.target.value)}} autoComplete="username" required />
              {mensagem && (
                <div className="w-full text-center">
                  <span className="text-red-500 font-bold cursor-default">{`${mensagem}`}</span>
                </div>
              )}
              <label htmlFor="senha" className="font-bold text-white">Senha</label>
              <input type="password" placeholder="Crie sua senha" className="p-[0.5rem] rounded-xl font-bold border shadow-white bg-stone-500 text-white" name="pass" id="senha" value={senha} onChange={(event) => {setSenha(event.target.value)}} required autoComplete="new-password" />

              <div className="Voltar flex w-full py-[10px] justify-center items-center">
                <Link to="/" className="font-bold text-blue-500 cursor-pointer">Voltar para Login</Link>
              </div>
              <div className="Actions flex w-full justify-center items-center">
               <button type="submit" className="btn btn-primary">Criar Usuário</button>
              </div>
            </form>
          </div>
          
        </section>
      </main>
    </>
  );
  
}
