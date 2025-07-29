<?php

class BancoDeDados{

  private static $pdo = null;



  public static function getConexao(){
    
    if(self::$pdo != null){
      return self::$pdo; 
    }


    try{
      $db = __DIR__ ."/../../DB/mercanotaDB";

      $dsn = "sqlite:$db";
 
      self::$pdo = new \PDO($dsn);

      self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    } catch (\PDOException $error){
      // Isso permite que o 'catch' em cadastro.php lide com o erro.
      throw new \PDOException($error->getMessage(), (int)$error->getCode());;
    }
    return self::$pdo;
  }

}


?>
