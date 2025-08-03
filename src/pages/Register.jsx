import React, { useState  } from "react"; 
import "../css/index.css";
import { Link, useNavigate } from "react-router-dom";
import ModalTailwind from "../components/ModalTail";
import { useFetch } from "../hooks/useFetch";





export default function RegisterSreen() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [ShowModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const {carregando, error, consulta} = useFetch();


  const handleCloseModal = () => {
    navigate('/')
  }

  async function CadastrandoUsuario(event){
    event.preventDefault();
    setMensagem('');
    setShowModal(false);
    
    const dados = {
      usuario: usuario,
      senha: senha,
    }

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'Application/json',}, 
      body: JSON.stringify(dados),
    }

    const {response, json} = await consulta('http://localhost:8000/src/api/cadastro.php', options);

    if(response.ok && json.success){
      setShowModal(true);

      setTimeout(() => {
        navigate('/');
      }, 2000)

      setMensagemSucesso(json.status);
    }else{
      setMensagem(error.status);
    }
    
  }

  return (
    <>

      {ShowModal && (
            <ModalTailwind 
              ClassName= "bg-black border border-white"
              TitleClass= "cursor-default"
              TitleModal= "Sucesso!"
              onCloser={handleCloseModal}
              Mensagem={mensagemSucesso}
              CloseButtonClass= "btn btn-primary flex-force"
              ButtonTask="Ir para login"
              SvgLoading="none"
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
                <Link to="/" className="font-bold text-blue-500 cursor-pointer">Voltar para login</Link>
              </div>
              <div className="Actions flex w-full justify-center items-center">
               <button type="submit" className="btn btn-primary flex-force">{carregando ?  (
                 <>
                   <svg className={`mr-2 size-5 animate-spin flex`} viewBox="0 0 24 24">
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeDasharray="40" 
                      strokeDashoffset="20" />
                   </svg>
                   <span>Criar Usuário</span>
               </>
               ) : ('Criar Usuário')}</button>
              </div>
            </form>
          </div>
          
        </section>
      </main>
    </>
  );
  
}
