<?php 
  
  /**
   * auth_controller
   * @author Ilin Danil
   */

  class auth_controller extends app\core\Controller {
    function index_action () {
      $this->View->Render("pages/Login", "BestPizza - Login");
    }

    function regin_action () {
      $this->View->Render("pages/Regin", "BestPizza - Regin");
    }

    function authorization_action () {
      $Model = new auth_model();
      $_SESSION["auth-fail"] = "Authorization fail";
      if (empty($_POST["email"]) OR empty($_POST["password"])) {
        $_SESSION["auth-fail"] = "Please fill all fields";
        return header("Location: /auth");
      }
      $query = $Model->query("SELECT * FROM users WHERE email = '" . strtolower($_POST["email"]) . "'");
      $user_data = mysqli_fetch_assoc($query);
      if (!$user_data) {
        $_SESSION["auth-fail"] = "Email Not Found";
        exit(header("Location: /auth"));
      }
      if ($user_data["password"] === $_POST["password"]) {
        $_SESSION["auth-fail"] = "";
        $_SESSION["user"]["isAuthorized"] = true;
        $_SESSION["user"]["data"] = $user_data;
        exit(header("Location: /account"));
      } else {
        $_SESSION["auth-fail"] = "Wrong password";
        exit(header('Location: /auth'));
      }
      exit(header('Location: /auth'));
    }

    function registration_action () {
      $Model = new auth_model();
      $_SESSION["auth-fail"] = "Registration fail";
      $P_EMAIL = $_POST["email"];
      $email = $Model->query("SELECT email FROM users WHERE email = '$P_EMAIL'");
      if ($email === false) {
        $Model->query("INSERT INTO users (name, surename, email, password) VALUES ('" . $_POST["name"] . "', '" . $_POST["surename"] . "', '" . $_POST["email"] . "', '" . $_POST["password"] . "')");
        $query = $Model->query("SELECT * FROM users WHERE email = '" . strtolower($_POST["email"]) . "'");
        $user_data = mysqli_fetch_assoc($query);
        $_SESSION["auth-fail"] = "";
        $_SESSION["user"]["isAuthorized"] = true;
        $_SESSION["user"]["data"] = $user_data;
        exit(header("Location: /account"));
      } else {
        $_SESSION["auth-fail"] = "Email already in use";
        exit(header('Location: /auth/regin'));
      }
    }

    function logout_action () {
      $_SESSION["user"]["isAuthorized"] = false;
      $_SESSION["user"]["data"] = undefined;
      exit(header("Location: /"));
    }
  }
 ?>