import MainPadrão from "../components/MainDefault";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import React, { useEffect, useState, useMemo, Fragment, useCallback } from "react";
import { SvgLoading } from "../components/Svgs"
import AvisoVazio from "../components/AvisoVazio";
import Popup from "../components/Popup"; 
import { Input, Label } from "../components/Formulario";
import ModalTailwind from "../components/ModalTail";

export default function ProdutosCriados(){
  const [Lojas, setLojas] = useState([]);
  const [Produtos, setProdutos] = useState([]);
  const [LojasProdutos, setLojasProdutos] = useState([]);

  const [ShowPoup, setShowPoup] = useState(false);
  const [Animate, setAnimate] = useState('');
  const [PopupAdicionar, setPopupAdicionar] = useState(false);
  const [PopupExcluir, setPopupExcluir] = useState(false);
  const [PopupMudarNome, setPopupMudarNome] = useState(false);

  const [ShowModal, setShowModal] = useState(false);
  const [Mensagem, setMensagem] = useState('');

  const [IdProdutoTable, setIdProdutoTable] = useState('');
  const [ProdutoCurrent, setProdutoCurrent] = useState([]);
  const [ProdutoNovoNome, setProdutoNovoNome] = useState('');
  const [PopupExcluirProduto, setPopupExcluirProduto] = useState(false);

  const [LojasDisponiveis, setLojasDisponiveis] = useState([]);
  const [LojasAtivas, setLojasAtivas] = useState([]);

  const [LojaNova, setLojaNova] = useState('');
  const [LojaExcluir, setLojaExcluir] = useState('');
  


  const {carregando, error, consulta} = useFetch();

  
  // Functions do Popup & Modal {
    const handlerPopupOpen = (idProduto) => {
      setShowPoup(true)
      setIdProdutoTable(idProduto)
      setAnimate('animate__animated animate__zoomIn')
    }

    const handlerPopupClose = () => {
      setAnimate('animate__animated animate__zoomOut')
      setTimeout(() => {setShowPoup(false)}, 500)
    }

    const handlerPopupAdicionarOpen = () => {
      handlerPopupClose()
      LojasNaoAdicionadas()
      setTimeout(() => {setPopupAdicionar(true); setAnimate('animate__animated animate__zoomIn');}, 500);
    }

    const handlerPopupExcluirOpen = () => {
      handlerPopupClose()
      LojasAtivasPush()
      setTimeout(() => {setPopupExcluir(true); setAnimate('animate__animated animate__zoomIn');}, 500);
    }

    const handlerPopupMudarOpen = () => {
      handlerPopupClose()
      CurrentProduto()
      setTimeout(() => {setPopupMudarNome(true); setAnimate('animate__animated animate__zoomIn');}, 500);
    }

    const handlerPopupVoltar = () => {
      setPopupAdicionar(false)
      setPopupExcluir(false)
      setPopupMudarNome(false)
      handlerPopupOpen(IdProdutoTable);
    }

    const handlerPopupExcluirProdutoOpen = (idProduto) => {
      setPopupExcluirProduto(true);
      setAnimate('animate__animated animate__zoomIn')
      setIdProdutoTable(idProduto);
    }

    const handlerPopupExcluirProdutoClose = () => { 
      setAnimate('animate__animated animate__zoomOut')
      setTimeout(() => {setPopupExcluirProduto(false)}, 500)
    }


    const ModalOpen = () => {
      setShowModal(true);

      setTimeout(() => {setShowModal(false)}, 2000)
    }

    const ModalClose = () => {
      setShowModal(false);
    }

  // }
  

  const AdicionarLoja = useCallback(async (e, idProduto, idLoja) => {
    e.preventDefault();


    try{
     
      const dados = {
        idProduto: idProduto,
        idLoja: idLoja,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dados),
      }

      
      const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=adicionarLoja', options)

      if(response.ok && json.success){
        setPopupAdicionar(false)
        ModalOpen();
        setMensagem(json.status)
        setTimeout(() => {location.reload()}, 2000)
      }else{
        setPopupAdicionar(false);
        alert("Error em atualizar");
      }

    }catch{
      setPopupAdicionar(false);
      alert("Error na conexão");
    }



  }, [consulta]);

  const ExcluirLoja = useCallback(async (e, idProduto, idLoja) => {
    e.preventDefault();

    try{
      const dados = {
        idProduto: idProduto,
        idLoja: idLoja,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dados),
      }

      
      const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=excluirLoja', options)

      if(response.ok && json.success){
        setPopupExcluir(false)
        ModalOpen();
        setMensagem(json.status)
        setTimeout(() => {location.reload()}, 2000)
      }else{
        setPopupExcluir(false);
        alert(json.status);
      }

    }catch{
      setPopupAdicionar(false);
      alert("Error na conexão");

    }

  }, [consulta]);


  useEffect(() => {
      
    const controller = new AbortController();


    const BuscarDados = async (signal) => {
      try{
        
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
          signal: signal,
        }


        const [lojaFetch, produtoFetch] = await Promise.all([
          consulta('http://localhost:8000/src/api/loja.php?acao=buscarLojas', options),
          consulta('http://localhost:8000/src/api/produto.php?acao=buscarProdutos', options)
        ]);

        if(lojaFetch.response.ok && produtoFetch.response.ok){
          const lojasDados = lojaFetch.json.dados;
          const produtoDados = produtoFetch.json.dados;


          setLojas(lojasDados || []);
          setProdutos(produtoDados || []);

          if(lojasDados.length > 0 && produtoDados.length > 0){
            
            const dados = {
              produtos: produtoDados,
            }



            const relacaoOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'Application/json',
              },
              credentials: 'include',
              body: JSON.stringify(dados),
              signal: signal,
            }


            const {response, json} = await consulta('http://localhost:8000/src/api/produto.php?acao=buscarRelacao', relacaoOptions);
            
            
            if(response.ok && json.success){
              setLojasProdutos(json.dados);
            }

          }
        }

        


      }catch(error){
        console.log(error)
      } 
    }

 
    BuscarDados(controller.signal);

    return () => {
      controller.abort();
    }
          
  }, [consulta]);


  const lojasMap = useMemo(() => {

    if(!Lojas || Lojas.length === 0){
      return {};
    }

    const map = {};

    Lojas.forEach(loja => {
      map[loja.idLoja] = loja.nome;
    });

    return map;
  }, [Lojas]);

  const LojasNaoAdicionadas = () => {
    const relacaoExiste = LojasProdutos.filter(rel => (IdProdutoTable == rel.FKidProduto))

    const idLojasAdicionadas = relacaoExiste.map(rel => rel.FKidLoja);

    const LojasNAOAdicionadas = Lojas.filter(loja => !idLojasAdicionadas.includes(loja.idLoja))

    setLojasDisponiveis(LojasNAOAdicionadas);

  }

  const LojasAtivasPush = () => {
    
    const relacaoExiste = LojasProdutos.filter(rel => (IdProdutoTable == rel.FKidProduto));

    const idLojasAtivas = relacaoExiste.map(rel => rel.FKidLoja);

    const NomeLojas = Lojas.filter(loja => idLojasAtivas.includes(loja.idLoja));

    setLojasAtivas(NomeLojas);

  }

  const CurrentProduto = () => {
    const ProdutoEditando = Produtos.filter(produto => (produto.idProduto == IdProdutoTable));
    
    setProdutoCurrent(ProdutoEditando);
  }


  if(error){
    console.log(error)
  }

  return (
    <>

    <Header />

    {ShowModal && (
      <>
        <ModalTailwind 
          ClassName= "bg-black border border-white"
          TitleClass= "cursor-default"
          TitleModal= "Sucesso!"
          onCloser={ModalClose}
          Mensagem={Mensagem}
          CloseButtonClass= "btn btn-danger flex-force"
          ButtonTask="Fechar"
          SvgLoading="block"
        />
        
      </>


    )
    }

    {ShowPoup && (
      <>
        <Popup Animacao={Animate} Titulo="Editar Produto">
          <div className="flex flex-col w-[20rem]">
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm" onClick={handlerPopupAdicionarOpen}>
              <span className="cursor-default text-white cursor-pointer">Adicionar a Loja</span>  
            </div>
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm" onClick={handlerPopupExcluirOpen}>
              <span className="cursor-default text-white cursor-pointer">Remover loja</span>  
            </div>
            <div className="w-full hover:bg-zinc-800 p-[0.5rem] cursor-pointer rounded-sm" onClick={handlerPopupMudarOpen}>
              <span className="cursor-default text-white cursor-pointer">Mudar Nome</span>  
            </div>
            <div className="w-full mt-[10px]">
              <button className="w-full btn btn-danger" onClick={handlerPopupClose}>Fechar</button>
            </div>
          </div>
        </Popup>


      </>

    )
    }
    {PopupAdicionar && (
      <>
        <Popup Animacao={Animate} Titulo="Adicionar a Loja">
          <div className="flex flex-col w-[20rem]">
            <form className="flex flex-col gap-[10px]" onSubmit={(e) => {AdicionarLoja(e, IdProdutoTable, LojaNova)}}>
              <select className="text-white w-full cursor-pointer p-[0.5rem] bg-zinc-800 rounded-sm" name="LojasDisponiveis" value={LojaNova} onChange={(e) => {setLojaNova(e.target.value)}} required>
                <option value="" disabled>-- Selecione uma Loja --</option>
                {LojasDisponiveis.length > 0 ?(
                  LojasDisponiveis.map(loja => (
                    <option key={loja.idLoja} value={loja.idLoja}>{loja.nome}</option>
                  ))
                ) : (
                  <>
                    <option value="" disabled>Nenhuma loja disponivel</option>
                  </>
                )
                }
              </select>

              <div className="w-full">
                <button className="btn btn-primary flex-force items-center justify-center w-full" type="submit">{
                  carregando ? (
                    <>
                      <SvgLoading />
                      Adicionar
                    </>
                  ) : (
                    <>
                      Adicionar
                    </>
                  )

                }</button>
              </div>
            </form>
            <div className="w-full mt-[10px]">
              <button className="btn btn-secondary w-full" onClick={handlerPopupVoltar}>Voltar</button>
            </div>
          </div>
        </Popup>
      </>

    )

    }
    {PopupExcluir && (
      <>
        <Popup Animacao={Animate} Titulo="Remover loja">
          <div className="flex flex-col w-[20rem]">
            <form className="flex flex-col gap-[10px]" onSubmit={(e) => {ExcluirLoja(e, IdProdutoTable, LojaExcluir)}}>
              <select name="LojasExcluir" className="text-white w-full cursor-pointer p-[0.5rem] bg-zinc-800 rounded-sm" value={LojaExcluir} onChange={(e) => {setLojaExcluir(e.target.value)}} required>
                <option value="" disabled>-- Selecione uma loja --</option>
                {
                  LojasAtivas.length > 1 ? (
                    LojasAtivas.map(loja => (
                      <option key={loja.idLoja} value={loja.idLoja}>{loja.nome}</option>
                    ))

                  ) : (
                    <>
                      <option value="" disabled>Produto não pode ficar sem loja</option>
                    </>
                  )
                }
              </select>

              <div className="w-full">
                <button className="btn btn-primary w-full" type="submit">Excluir</button>
              </div>
            </form>
            <div className="w-full mt-[10px]">
              <button className="btn btn-secondary w-full" onClick={handlerPopupVoltar}>Voltar</button>
            </div>
          </div>
        </Popup>

      </>

    )
    }

    {PopupMudarNome && (
      <Popup Animacao={Animate} Titulo="Mudar nome">
        <div className="flex flex-col w-[20rem]">
          <form className="flex flex-col gap-[10px]">

            {
              ProdutoCurrent.map(produto => (
                <Fragment key={produto.idProduto}>
                  <Label htmlFor="NovoNome" LabelText={`Novo nome para: ${produto.nome}`}  />
                </Fragment>
              ))
            }
            <Input typeInput="text" idInput="NovoNome" placeholder="Digite o novo nome" isRequired={true} onChange={(e) => {setProdutoNovoNome(e.target.value)}} valueInput={ProdutoNovoNome} />

            <div className="w-full">
              <button className="btn btn-primary w-full" type="submit">Mudar</button>
            </div>
          </form>

          <div className="w-full mt-[10px]">
            <button className="btn btn-secondary w-full" onClick={handlerPopupVoltar}>Voltar</button>
          </div>
        </div>
        
      </Popup>

    )

    }

    {PopupExcluirProduto && (
      <Popup Animacao={Animate} Titulo={<><i className="bi bi-exclamation-octagon-fill"></i> AVISO</>} Mensagem="Ao deletar um produto você está deletando todas suas relações com suas lojas e ele proprio. Isso não pode ser revertido! Deseja fazer isso?">
        <div className="flex justify-start gap-[5px] items-center">
          <button className="btn btn-danger" onClick={handlerPopupExcluirProdutoClose}>Cancelar</button>
          <button className="btn btn-success">Confimar</button>
        </div>
      </Popup>
    )  
    }

    <MainPadrão titulo="Seus Produtos" descricao="Modifique o nome e as lojas que seus produtos pertencem" localVoltar="/home">

      {carregando && (
        <div className="w-full flex">
          <SvgLoading />
          <span>Carregando...</span>
        </div>        

      )} 
      {Lojas.length > 0 ? (
          <>
            <div className="w-full overflow-y-scroll overflow-x-hidden max-h-[20rem]">
              <table className="w-full border-separate border-spacing-2 border border-white">
                           
                <thead className="text-white cursor-default">
                  <tr>
                    <th>Produtos</th>
                    <th>Lojas</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Produtos.map(produto =>{

                      const relacoesProdutos = LojasProdutos.filter(rel => (rel.FKidProduto === produto.idProduto));

                      const nomeLojas = relacoesProdutos.map(rel => lojasMap[rel.FKidLoja]);


                      return (
                      <tr key={produto.idProduto} className="text-white cursor-default bg-zinc-900 even:bg-zinc-800">
                        <td className="align-middle p-1">
                            <div className="flex justify-center items-center gap-[5px]">
                              {produto.nome}<i className="bi bi-info-circle-fill" title={`Criado em: ${produto.dataCriada}`}></i>
                            </div>
                          </td>
                          <td className="text-center align-middle p-1">{nomeLojas.join(', ')}</td>
                          <td className="align-middle">
                            <div className="flex justify-center items-center p-1 gap-[5px]">
                              <button className="btn btn-danger" title="Excluir Produto" onClick={() => {handlerPopupExcluirProdutoOpen(produto.idProduto)}}><i className="bi bi-trash-fill"></i></button>
                              <button className="btn btn-secondary" title="Editar" onClick={() => {handlerPopupOpen(produto.idProduto)}}><i className="bi bi-pencil-square"></i></button>
                            </div>
                          </td>
                        </tr>

                      );



                    })
    
                  } 
                </tbody>
                                
              </table>
            </div>
            
          </>
        ) : (
          <>
            <div className="w-full flex">
              <AvisoVazio
                ClassNameContainer="bg-red-800 w-full text-white"
                NameAviso="Você ainda não criou lojas"
                Content="Nenhuma loja foi criada ainda, clique no botão abaixo para criar sua primeira loja"
                StyleButton="btn-secondary"
                Action="Ir criar loja"
                Path="/createLoja" 
              />
            </div>
          </>
        )
      }

    </MainPadrão>

    <Footer />

    </>
  );


}
