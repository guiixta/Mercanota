<?php

class UsuarioRepositorio {
  
  private $pdo;
  
  public function __construct(PDO $pdo){
      $this->pdo = $pdo;
  }
  

  // Cadastro functions 
  public function UsuarioExiste($usuario){
    $query = "SELECT COUNT(*) FROM USUARIOS WHERE usuario = :usuario";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    return $stmt->fetchColumn() > 0;
  }

  public function CadastrarUsuario($usuario, $senha){
    $hashSenha = password_hash($senha, PASSWORD_DEFAULT);

    $query = "INSERT INTO USUARIOS(usuario, senha) VALUES(:usuario, :senha)";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':senha', $hashSenha);

    return $stmt->execute();
  }

  // Login functions


  public function Logar($usuario, $senha){
    
    try{
      $query = "SELECT usuario, senha FROM USUARIOS WHERE usuario = :usuario";

      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':usuario', $usuario);

      $stmt->execute();

      $dadosBanco = $stmt->fetch();

      if(isset($dadosBanco)){
        return false;
      }
  
      //Sucesso ao logar
      return password_verify($senha, $dadosBanco['senha']);

    }catch(\PDOException $e) {
      echo $e->getMessage();  
    }

      return false;
  }


}

?>
