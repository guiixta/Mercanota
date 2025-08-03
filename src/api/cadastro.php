<?php
  
  require_once "../config/conexao.php";
  require_once "../app/repositorioUsuario.php";
  require_once "api_config.php";
 
  
  try{
    $pdo = BancoDeDados::getConexao();
    $repositorio = new UsuarioRepositorio($pdo);


    $jsonRecebido = file_get_contents('php://input');
    $dados = json_decode($jsonRecebido, true);

    if(isset($dados['usuario']) && isset($dados['senha'])){
      $usuarioRecebido = $dados['usuario'];
      $senhaRecebida = $dados['senha'];

      if($repositorio->UsuarioExiste($usuarioRecebido)){
        echo json_encode([
          'success' => false,
          'status' => 'Usuário já existe'
        ]);
        exit;
      }

      if($repositorio->CadastrarUsuario($usuarioRecebido, $senhaRecebida)){
        echo json_encode([
          'success' => true,
          'status' => 'Usuário cadastrado com sucesso!'
        ]);
      }

    }
 
  } catch(Exception $error){
    echo json_encode([
      'success' => false,
      'status' => 'Não foi possível se conectar.'. $error->getMessage()
    ]);
    
  }
  
  


?>
