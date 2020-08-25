<?
  class Good {
    function get($type = 'name') {
      return $this->$type;
    }
  }
?>