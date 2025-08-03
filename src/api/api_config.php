<?php
  
  $sessionPath = __DIR__ . "/../sessions";

  if (!is_dir($sessionPath)) {
      mkdir($sessionPath, 0777, true); 
  }

  ini_set('session.save_path', $sessionPath);

  date_default_timezone_set('America/Sao_Paulo');

  header('Access-Control-Allow-Origin: http://localhost:5173');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');

  header('Content-Type: Application/json');

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(); // Encerra o script aqui para requisições OPTIONS.
  }



  session_start();
?>
