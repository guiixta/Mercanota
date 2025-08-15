<?php

  require_once "api_config.php";
  require_once "auth_guard.php";
  require_once "../config/conexao.php";
  require_once "../app/repositorioCriarItens.php";
  require_once "../app/repositorioBuscarItens.php";
  require_once "../app/repositorioDeletarItens.php";

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

      case "buscarProdutos":
        try{
          $repositorio = new BuscarItens($pdo);

          $produtos = $repositorio->BuscarProdutos($usuario);
          
          if(!empty($produtos)){
            echo json_encode([
              'success' => true,
              'dados' => $produtos
            ]);
          }else{
            echo json_encode([
              'success' => false,
              'status' => "Nenhum produto encontrado"
            ]);
          }
          
        }catch(\PDOException $err){
          echo json_encode([
            'success' => false,
            'status' => $err
          ]);  
          
        } 
      break;

      case "buscarRelacao":
        try{
          $jsonRecebido = file_get_contents('php://input');

          $dados = json_decode($jsonRecebido, true);

          if(isset($dados['produtos'])){
            $idProdutos = array_column($dados['produtos'], 'idProduto');
            
                       
            $repositorio = new BuscarItens($pdo);

            $relacaoLojasProdutos = $repositorio->BuscarLojasProdutos($idProdutos);
           

            if(!empty($relacaoLojasProdutos)){
              echo json_encode([
                'success' => true,
                'dados' => $relacaoLojasProdutos
              ]);
            }else{
              echo json_encode([
                'success' => false,
                'status' => "Error ao obter Relacao Lojas e Produtos"
              ]);
            }

          }else{
            echo json_encode([
              'success' => false,
              'status' => "Nenhum dado enviado"
            ]);
          }


        }catch(\PDOException $err){
          echo json_encode([
            'success' => false,
            'status' => $err
          ]);  
        }
      break;

      case "adicionarLoja":
        try{
          $jsonRecebido = file_get_contents('php://input');

          $dados = json_decode($jsonRecebido, true);
          
          
          if(isset($dados['idProduto']) && isset($dados['idLoja'])){

            $idProduto = $dados['idProduto'];
            $idLoja = $dados['idLoja'];

            $repositorio = new CriarItens($pdo);
            
            if($repositorio->AdicionarLojaProduto($idLoja, $idProduto)){
              echo json_encode([
                'success' => true,
                'status' => "Loja adicionada com sucesso!"
              ]);
            }else{
              echo json_encode([
                'success' => false
              ]);
            }

          }

        }catch(\PDOException $err){
          echo json_encode([
            'success' => false,
            'status' => "Error na conexão"
          ]); 
        }

      break;
      
      case "excluirLoja":        
         try{
            $jsonRecebido = file_get_contents('php://input');

            $dados = json_decode($jsonRecebido, true);
            
            
            if(isset($dados['idProduto']) && isset($dados['idLoja'])){

              $idProduto = $dados['idProduto'];
              $idLoja = $dados['idLoja'];

              $repositorio = new DeletarItens($pdo);
              
              if($repositorio->DeletarLojaProduto($idLoja, $idProduto)){
                echo json_encode([
                  'success' => true,
                  'status' => "Loja removida com sucesso!"
                ]);
              }else{
                echo json_encode([
                  'success' => false,
                  'status' => "Você não pode deixar um produto sem loja."
                ]);
              }

            }

         }catch(\PDOException $err){
            echo json_encode([
              'success' => false,
              'status' => "Error na conexão"
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
