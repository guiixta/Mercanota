<?php
  
  require_once "./api_config.php";
  require_once "./auth_guard.php";
  require_once "../config/conexao.php";
  require_once "../app/repositorioCriarItens.php";


  $data = new DateTime();

  $dataFormat = $data->format('Y-m-d, H:i:s');


  try{

    $pdo = BancoDeDados::getConexao();
    $repositorio = new CriarItens($pdo);


    $jsonRecebido = file_get_contents('php://input');  
    $dados = json_decode($jsonRecebido, true);

    $usuario = $_SESSION['usuario'];

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

?>
