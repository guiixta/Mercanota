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

  //Deletar Produto e suas relaçoes
  public function DeletarProduto($idProduto){
    try{
      $this->pdo->beginTransaction();

      $stmt = $this->pdo->prepare("DELETE FROM PRODUTOS WHERE idProduto = :idProdutoRecebido");
      $stmt->bindParam(':idProdutoRecebido', $idProduto);
      $stmt->execute();

      $stmt2 = $this->pdo->prepare("DELETE FROM LOJAS_PRODUTOS WHERE FKidProduto = :idProdutoRecebido");
      $stmt2->bindParam(':idProdutoRecebido', $idProduto);
      $stmt2->execute();


      $stmt3 = $this->pdo->prepare("DELETE FROM PRODUTOS_ATRIBUTOS WHERE FKidProduto = :idProdutoRecebido");
      $stmt3->bindParam(':idProdutoRecebido', $idProduto);
      $stmt3->execute();

      $stmt4 = $this->pdo->prepare("DELETE FROM PRODUTOS_RELATORIOS WHERE FKidProduto = :idProdutoRecebido");
      $stmt4->bindParam(':idProdutoRecebido', $idProduto);
      $stmt4->execute();

      $stmt5 = $this->pdo->prepare("DELETE FROM VARIACOES WHERE FKidProduto = :idProdutoRecebido");
      $stmt5->bindParam(':idProdutoRecebido', $idProduto);
      $stmt5->execute();


      return $this->pdo->commit();

    }catch(\PDOException){
      $this->pdo->rollBack();
      return false;    
    }
  
  }



}

?>
