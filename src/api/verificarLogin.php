<?php
  session_start();
  require_once "../config/conexao.php";
  header('Access-Control-Allow-Origin: http://localhost:5173');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  


  if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    http_response_code(200);
    exit;
  }
  header('Content-Type: Application/json');


  try{
    $pdo = BancoDeDados::getConexao();  

    if(isset($_SESSION['usuario'])){
      echo json_encode([
        'success' => true
      ]);
    }else{
      echo json_encode([
        'success' => false,
        'status' => "Usuário não está logado!"
      ]);
    }

  }catch (\PDOException $e){
    echo json_encode([
      'success' => false,
      'status' => "Falha na conexão". $e
    ]);
  }

?>
