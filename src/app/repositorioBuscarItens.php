<?php

class BuscarItens {

  private $pdo;

  public function __construct(PDO $pdo){
    $this->pdo = $pdo;
  }

  // Buscar Lojas
  public function BuscarLojas($usuario){
    $query = "SELECT idLoja, nome, dataCriada FROM LOJAS WHERE FKusuario = :usuario";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  // Buscar Produtos
  public function BuscarProdutos($usuario){
    $query = "SELECT idProduto, nome, dataCriada FROM PRODUTOS WHERE FKusuario = :usuario";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }


}



?>
