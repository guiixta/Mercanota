<?php 

  require_once "./api_config.php";


  if(!isset($_SESSION['usuario'])){
    http_response_code(401);
    
    echo json_encode([
      'success' => false,
      'status' => "Usuário não logado fazendo requisição"
    ]);

    exit;
  }
?>
