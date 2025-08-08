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

  // Buscar Relação Lojas_Produtos
  public function BuscarLojasProdutos($idProdutos){

    if(empty($idProdutos)){
      return [];
    }

    //Gera = ?,?,? para cada item no array de produtos
    $placeholders = implode(',', array_fill(0, count($idProdutos), '?'));

    $query = "SELECT FKidProduto, FKidLoja FROM LOJAS_PRODUTOS WHERE FKidProduto IN ($placeholders)";
    $stmt = $this->pdo->prepare($query);

    foreach ($idProdutos as $key => $id){
      $stmt->bindValue($key + 1, $id, PDO::PARAM_INT);
    }

    $stmt->execute($idProdutos);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    
  }


}



?>
