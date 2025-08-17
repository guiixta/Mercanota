<?php
  require_once "api_config.php";
  require_once "auth_guard.php";
  require_once "../config/conexao.php";
  require_once "../app/repositorioCriarItens.php";
  require_once "../app/repositorioBuscarItens.php";

  $data = new DateTime();
  $dataAtual = $data->format('Y-m-d, H:i:s');


  $acao = $_GET['acao'];

  $usuario = $_SESSION['usuario'];

  $pdo = BancoDeDados::getConexao();


  switch($acao){




    // Criar grupo
    case "criarGrupo":

      try{
        $repositorio = new CriarItens($pdo);

        $jsonRecebido = file_get_contents('php://input');

        $dados = json_decode($jsonRecebido, true);

        if(isset($dados['nomeGrupo'])){
          $nomeGrupo = $dados['nomeGrupo'];

          $intAleatorio = $repositorio->gerarIdInt();

          $idGrupo = $intAleatorio . $data->format('Ymd');


          if($repositorio->CreateGrupo($idGrupo, $nomeGrupo, $dataAtual, $usuario)){
            echo json_encode([
              'success' => true,
              'status' => "Grupo criado com sucesso!"
            ]);
          }else{
            echo json_encode([
              'success' => false,
              'status' => "Não foi possível cadastrar o grupo"
            ]);
          }
        }
      
      }catch(\PDOException $err){
        echo json_encode([
          'success' => false,
          'status' => $err
        ]);
      }

      break;

    case "buscarGrupos":
      try{
        $repositorio = new BuscarItens($pdo);
        
        $grupos = $repositorio->BuscarGrupos($usuario); 
        if(!empty($grupos)){
          echo json_encode([
            'success' => true,
            'dados' => $grupos
          ]);
        }else{
          echo json_encode([
            'success' => false,
            'status' => "Nenhum grupo encontrado"
          ]);
        }

      }catch(\PDOException $err){
        echo json_encode([
          'success' => false,
          'status' => $err
        ]);
      }

      break;

    default:
      break;
  }

?>
