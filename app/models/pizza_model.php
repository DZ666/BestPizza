<?php 
  
  /**
   * pizza_model
   * @author Ilin Danil
   */

  class pizza_model extends app\core\Model {
    public function upload_donation_cards () {
      require 'app/views/templates/donation-cards.tpl';
    }
    // Function For Call First News When The Page Is Only Uploaded 
    public function upload_news () 
    {
      $news_schedule = $this->query("SELECT * FROM news WHERE isaviable = 1 ORDER BY post_time DESC");
      $response = [];
      while ($row = mysqli_fetch_assoc($news_schedule)) {
        array_push($response, $row);
      }
      return $response;
    }

    // Get Partners Schedule 
    public function upload_partners () 
    {

      $partners = $this->query("SELECT * FROM `partners` ORDER BY id");
      $response = [];
      while ($row = mysqli_fetch_assoc($partners)) {
        array_push($response, $row);
      }
      return $response;

    }

  }
  
 ?>