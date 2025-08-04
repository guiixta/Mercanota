<?php

class DeletarItens{

  private $pdo;


  public function __construct(PDO $pdo){
    $this->pdo = $pdo; 
  }

  
  // Deletar Loja
  public function DeletarLoja($idLoja, $usuario){
    try{
      $this->pdo->beginTransaction();

      $stmt = $this->pdo->prepare("DELETE FROM LOJAS_PRODUTOS WHERE FKidLoja = :idLoja");
      $stmt->execute([':idLoja' => $idLoja]);

      $stmt2 = $this->pdo->prepare("DELETE FROM RELATORIOS WHERE FKidLoja = :idLoja");
      $stmt2->execute([':idLoja' => $idLoja]);

      $stmt3 = $this->pdo->prepare("DELETE FROM LOJAS WHERE idLoja = :idLoja AND FKusuario = :usuario");
      $stmt3->execute([':idLoja' => $idLoja, ':usuario' => $usuario]);

      return $this->pdo->commit();

    }catch(\PDOException){
      $this->pdo->rollback();

      return false;
    }
  }



}

?>
