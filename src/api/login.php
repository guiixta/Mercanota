<?php 

  require_once "../config/conexao.php";
  require_once "../app/repositorioUsuario.php";

  header('Access-Control-Allow-Origin: http://localhost:5173');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');



  if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
      http_response_code(200);
      exit;
  }

  header('Content-Type: Application/json');

  try{
    $pdo = BancoDeDados::getConexao();
    $repositorio = new UsuarioRepositorio($pdo);

    $jsonRecebido = file_get_contents('php://input');
    $dados = json_decode($jsonRecebido, true);

    if (isset($dados['usuario']) && isset($dados['senha'])){
      $usuarioRecebido = $dados['usuario'];
      $senhaRecebida = $dados['senha']; 

      if($repositorio->Logar($usuarioRecebido, $senhaRecebida)){
        echo json_encode([
          'success' => true,
          'status' => "Usuário logado"
        ]);
      }else{
        echo json_encode([
          'success' => false,
          'status' => "Dados invalido ou inexistentes"
        ]);
        exit;
      }

    }else{
      echo json_encode([
        'success' => false,
        'status' => "Nada recebido"
      ]);
      exit;
    } 
  
  }catch(\PDOException $e){
    echo json_encode([
      'success' => false,
      'status' => $e->getMessage()
    ]);
  }









?>
