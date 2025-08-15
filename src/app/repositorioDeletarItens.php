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

  //Deletar Relação LOJAS_PRODUTOS
  public function DeletarLojaProduto($idLoja, $idProduto){
    $query = "SELECT COUNT(*) as Total FROM LOJAS_PRODUTOS WHERE FKidProduto = :FKidProdutoRecebido";

    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':FKidProdutoRecebido', $idProduto);
    $stmt->execute();

    $resultado = $stmt->fetch();

    $numeroDeRelacoes = (int) $resultado['Total'];

    if($numeroDeRelacoes > 1){
      $query2 = "DELETE FROM LOJAS_PRODUTOS WHERE FKidLoja = :FKidLojaRecebido AND FKidProduto = :FKidProdutoRecebido";
  
      $stmt2 = $this->pdo->prepare($query2);
      $stmt2->bindParam(':FKidLojaRecebido', $idLoja);
      $stmt2->bindParam(':FKidProdutoRecebido', $idProduto);

      return $stmt2->execute();
    }
  
  }



}

?>
