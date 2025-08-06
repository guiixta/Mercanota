<?php

  require_once "api_config.php";
  require_once "auth_guard.php";
  require_once "../config/conexao.php";
  require_once "../app/repositorioCriarItens.php";

  $data = new DateTime();
  $dataFormatada = $data->format('Y-m-d, H:i:s'); 
  
  $acao = $_GET['acao'];

  $usuario = $_SESSION['usuario'];

  $pdo = BancoDeDados::getConexao();

  if(isset($acao)){
    switch($acao){

      case "criar":
        try{
          $jsonRecebido = file_get_contents('php://input');
          $dados = json_decode($jsonRecebido, true);

          $repositorio = new CriarItens($pdo);

          if(isset($dados['nomeProduto']) && isset($dados['lojas'])){
            $idLojas = $dados['lojas'];
            $nomeProduto = $dados['nomeProduto'];
            
            $intAleatorio = $repositorio->gerarIdInt();

            $idProduto = $intAleatorio . $data->format('Ymd');

            if($repositorio->CreateProduto($idProduto, $nomeProduto, $dataFormatada, $usuario, $idLojas)){
              echo json_encode([
                'success' => true,
                'status' => "Produto criado com sucesso!"
              ]); 
            }else{
              echo json_encode([
                'success' => false,
                'status' => "Falha ao cadastrar produto"
              ]);
            }

          }else{
            echo json_encode([
              'success' => false,
              'status' => "Dados não recebidos"
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
      echo json_encode([  
        'success' => false,
        'stauts' => "Nenhuma ação correspondida"
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
