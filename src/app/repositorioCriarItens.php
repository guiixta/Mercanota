<?php 

class CriarItens {

    private $pdo;

    public function __construct(PDO $pdo){
      $this->pdo = $pdo;
    }
      

    public function gerarIdInt(){

      $min = pow(10, 3) - 1;
      $max = pow(10, 4) - 1;

      return random_int($min, $max);
    }
    // Criar nova loja
    public function CreateLoja($nomeLoja, $dataCriada, $idLoja, $usuario){
      
      $query = "INSERT INTO LOJAS(nome, dataCriada, idLoja, FKusuario) VALUES(:nomeRecebido, :dataRecebido, :idLojaRecebido, :usuarioRecebido)";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':nomeRecebido', $nomeLoja );
      $stmt->bindParam(':dataRecebido', $dataCriada);
      $stmt->bindParam(':idLojaRecebido', $idLoja);
      $stmt->bindParam(':usuarioRecebido', $usuario);


      return $stmt->execute();
    }



}






?> 
