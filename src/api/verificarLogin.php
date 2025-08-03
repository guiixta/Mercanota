<?php
  
  require_once "./api_config.php"; 
  
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

?>
