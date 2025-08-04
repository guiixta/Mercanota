<?php

class AtualizarItens{
  private $pdo;

  public function __construct(PDO $pdo){
    $this->pdo = $pdo;
  }



  // Atualizar Lojas
  public function UpdateLojas($idLoja, $nome){
    $query = "UPDATE LOJAS SET nome = :nome WHERE idLoja = :idLoja";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':idLoja', $idLoja);

    return $stmt->execute();
    
  }

}

?>
