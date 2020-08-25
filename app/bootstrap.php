<?php 
	require "app/core/Model.php";
	require "app/core/Router.php";
	require "app/core/Controller.php";
	require "app/core/View.php";
	require "app/libs/render.php";
	$Router = new app\core\Router;
	$Router->start();
?>