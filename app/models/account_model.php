<?php 
  
  /**
   * account_model
   * @author Ilin Danil
   */

  class account_model extends app\core\Model {
    public function GetOrdersHistory() {
      $query = $this->query("
        SELECT
          orders.id AS Order_Id,
          orders.order_time AS Order_Require_Time,
          goods.img AS Good_Img,
          goods.price_usd AS price_usd,
          goods.price_eur AS price_eur,
          goods.name AS Good_Name
        FROM 
          goods
          INNER JOIN orders_goods ON goods.id = orders_goods.good_id
          INNER JOIN orders ON orders_goods.order_id = orders.id
          INNER JOIN users_orders ON orders_goods.order_id = users_orders.order_id
          INNER JOIN users ON users_orders.user_id = users.id
        WHERE 
          users.id = " . $_SESSION["user"]["data"]["id"] . "
      ");
      $result = [];
      while ($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
      }
      return $result;
    }
  }
  
 ?>