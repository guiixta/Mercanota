<?php
  
  require_once "./api_config.php";
  require_once "./auth_guard.php";
  require_once "../config/conexao.php";
  require_once "../app/repositorioCriarItens.php";
  require_once "../app/repositorioBuscarItens.php";
  require_once "../app/repositorioDeletarItens.php";
  require_once "../app/repositorioAtualizarItens.php";


  $data = new DateTime();
  $dataFormat = $data->format('Y-m-d, H:i:s');


  $acao = $_GET['acao'];

  $pdo = BancoDeDados::getConexao();
  $usuario = $_SESSION['usuario'];


  if(isset($acao)){
    switch($acao){
      case "criar":
        try{

          $repositorio = new CriarItens($pdo);


          $jsonRecebido = file_get_contents('php://input');  
          $dados = json_decode($jsonRecebido, true);
     
          $nums = $repositorio->gerarIdInt();

          $idLoja = $nums . $data->format('Ymd');

          if(isset($dados['nomeLoja']) && isset($usuario) && isset($idLoja)){
            $nomeLoja = $dados['nomeLoja'];

            if($repositorio->CreateLoja($nomeLoja, $dataFormat, $idLoja, $usuario)){
              
              echo json_encode([
                'success' => true,
                'status' => "Loja criada! Verifique em: 'Ver lojas' no menu inicial"
              ]);
                       
            }else{
              echo json_encode([
                'success' => false,
                'status' => "Falha ao criar loja no banco de dados"
              ]);
            }
          }else{
            echo json_encode([
              'success' => false,
              'status' => "Informações vazias ou não criadas"
            ]);
          }

        }catch(\PDOException $err) {
          echo json_encode([
            'success' => false,
            'status' => $err
          ]);
        }
        break;

      case "buscarLojas":
        try{
          $repositorio = new BuscarItens($pdo);
            
          $lojas = $repositorio->BuscarLojas($usuario);

          if(!empty($lojas)){
            echo json_encode([
              'success' => true,
              'dados' => $lojas 
            ]);
          }else{
             echo json_encode([
               'success' => false,
               'status' => "Lojas não encontradas"
             ]);
          }

        }catch(\PDOException $err){
          echo json_encode([
            'success' => false,
            'status' => $err
          ]);
        }
        break;


      case "deletarLoja":
        if(isset($_GET['idLoja'])){
          $idLoja = $_GET['idLoja'];
          
          try{
            $repositorio = new DeletarItens($pdo);

            $deletarLoja = $repositorio->DeletarLoja($idLoja, $usuario);

            if($deletarLoja){
              echo json_encode([
                'success' => true,
                'status' => "Loja deletada com sucesso!"
              ]);
            }else{
              echo json_encode([
                'success' => false,
                'status' => "Erro ao deletar lojas"
              ]);
            }

          }catch(\PDOException $err){
            echo json_encode([
              'success' => false,
              'status' => $err 
            ]);
          }

        }
        break;

      case "editarLoja":
        if(isset($_GET['idLoja']) && isset($_GET['nome'])){
          $idLoja = $_GET['idLoja'];
          $nomeNovo = $_GET['nome'];

          try{
            $repositorio = new AtualizarItens($pdo);

            $update = $repositorio->UpdateLojas($idLoja, $nomeNovo);

            if($update){
              echo json_encode([
                'success' => true,
                'status' => "Nome alterado com sucesso!"
              ]);
            }else{
              echo json_encode([
                'success' => false,
                'status' => "Não foi possível atualizar o nome da loja"
              ]);
            }
          
          }catch(\PDOException $err){
            echo json_encode([
              'success' => false,
              'status' => $err
            ]);
          }
        }
        break;

      default:
        echo json_encode([
          'success' => false,
          'status' => "Nenhuma ação recebida"
        ]);
        break;
    
    } // Fim switch
  }else{
    echo json_encode([
      'success' => false,
      'status' => "Ação não recebida"
    ]);
  }
?>
