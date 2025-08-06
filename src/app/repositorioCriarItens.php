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

    

    //Criar novo Produto
    public function CreateProduto($idProduto, $nomeProduto, $dataCriadaP, $usuario, $idLojas){
    
      try{

        $this->pdo->beginTransaction();

        $query = "INSERT INTO PRODUTOS(idProduto, nome, dataCriada, FKusuario) VALUES(:idProdutoRecebido, :nomeRecebido, :dataRecebido, :usuarioRecebido)";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':idProdutoRecebido', $idProduto);
        $stmt->bindParam(':nomeRecebido', $nomeProduto);
        $stmt->bindParam(':dataRecebido', $dataCriadaP);
        $stmt->bindParam(':usuarioRecebido', $usuario);
        $stmt->execute();


        $query2 = "INSERT INTO LOJAS_PRODUTOS(FKidLoja, FKidProduto) VALUES(:idProdutoRecebido, :idLojaRecebido)";

        $stmt2 = $this->pdo->prepare($query2);

        foreach($idLojas as $id){
          $stmt2->bindParam(':idProdutoRecebido', $idProduto);
          $stmt2->bindParam(':idLojaRecebido', $id);
          $stmt2->execute();
        }

        return $this->pdo->commit(); 

      }catch(\PDOException $err){
        $this->pdo->rollBack();
        echo $err;
        return false;
      }
        
    }

}






?> 
