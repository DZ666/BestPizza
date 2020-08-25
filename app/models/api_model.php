<?php 
  
  /**
   * api_model
   * @author Ilin Danil
   */

  class api_model extends app\core\Model {
    function allGoods($amount = 10) {
      $goods = [];
      $query = $this->query("SELECT * FROM goods");
      while ($row = mysqli_fetch_assoc($query)) {
        $row["ingridients"] = $this->returnIngridients($row["id"]);
        array_push($goods, $row);
      }
      return $goods;
    }

    function getGood($id) {
      return mysqli_fetch_assoc($this->query("SELECT * FROM goods WHERE goods.id = $id"));
    }

    private function returnIngridients($goodId) {
      $ingridients;
      $query = $this->query("
        SELECT ingridients.name AS ingridients
        FROM goods_ingridients 
        INNER JOIN goods ON goods_ingridients.good_id = goods.id
        INNER JOIN ingridients ON goods_ingridients.ingridient_id = ingridients.id
        WHERE goods.id = $goodId
      ");
      while ($row = mysqli_fetch_assoc($query)) {
        $ingridients[] = $row["ingridients"];
      }
      return $ingridients;
    }

    public function GetAllOrderedGoods() {
      $Goods = [];
      $GoodsData = $_SESSION["user"]["basket"];
      if ($GoodsData) {
        foreach ($GoodsData as $indexGood) {
          // Get Good With Dollar
          $Good = $this->getGood($indexGood["GoodId"]);
          array_push($Goods, [
            "id" => $Good["id"],
            "img" => $Good["img"],
            "name" => $Good["name"],
            "description" => $Good["description"],
            "price_usd" => $Good["price_usd"],
            "price_eur" => $Good["price_eur"],
            "valute" => $indexGood["Valute"],
            "ingridients" => $this->returnIngridients($Good["id"]),
          ]);
        }
      }
      return $Goods;
    }

    public function removeToBasket() {
      $newInBasket = [];
      foreach ($_SESSION['user']['basket'] as $good) {
        if ($good['GoodId'] !== $_POST['GoodId']) {
          $newInBasket[] = $good;
        }
      }
      $_SESSION['user']['basket'] = $newInBasket;
      echo json_encode(Array( 'response' => true ));
    }

    public function removeAllFromBasket() {
      $_SESSION['user']['basket'] = [];
    }

    public function CreateNewOrder($data) {
      // Create New Order
      $this->query("
        INSERT INTO `orders` 
          (`user_name`, `phone_number`, `street`, `flat_number`, `front_door`, `door_code`, `floor`, `comment`) 
        VALUES ('" . $data["Name"] . "', '" . $data["Phone_Number"] . "', '" . $data["Street"] . "', '" . $data["Flat_Number"] . "', '" . $data["Front_Door"] . "', '" . $data["Door_Code"] . "', '" . $data["Floor"] . "', '" . $data["Comment"] . "')
      ");
      $orderID = mysqli_fetch_assoc($this->query("SELECT MAX(`id`) AS id FROM `orders`"))['id'];
      if ($_SESSION['user']['isAuthorized']) {
        $userId = $_SESSION['user']['data']['id'];
      } else {
        $userId = 1;
      }
      $u_o = $this->query("INSERT INTO `users_orders` (`user_id`, `order_id`) VALUES ($userId, $orderID)");
      if ($u_o) {
        foreach ($_SESSION['user']['basket'] as $good) {
          $goodID = $good['GoodId'];
          $this->query("INSERT INTO `orders_goods` (`order_id`, `good_id`) VALUES ($orderID, $goodID)");
        }
      } else {
        $this->query("DELETE FROM orders WHERE orders.id = $orderID");
        return false;
      }
      return true;
    }
  }
  
 ?>