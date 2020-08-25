<?
  class Fetch extends app\core\Model {
    function allGoods($amount = 10) {
      $goods = [];
      $query = $this->query("SELECT * FROM goods");
      while ($row = mysqli_fetch_assoc($query)) {
        $row["ingridients"] = $this->returnIngridients($row['id']);
        array_push($goods, $row);
      }
      return $goods;
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
        $ingridients[] = $row;
      }
      return $ingridients;
    }
  }

?>
