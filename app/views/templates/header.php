<?php 
	// All Includes
  include "/app/libs/fetch_data.php";
  include "/app/libs/good.php";

	// Check Data
	$_SESSION['in_amount'] += 1;

  $Fetch = new Fetch();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
	<!-- MAIN METATAGS -->
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
	<meta name="google" value="notranslate">
	
	<!-- CEO METATAGS -->
	<meta name="description" content="BestPizza.com, the best pizza delivery service in Saint-Petersburg">
	<meta name="keywords" content="BestPizza, Pizza, Pizza Delivery, Tasty Pizza">
	<meta name="robots" content="robot">
	<meta name="author" lang="ru" content="danililin858@gmail.com">
	<meta name="copyright" content="danililin858@gmail.com">
	
	<!-- STYLES -->
	<link rel="stylesheet" href="/public/styles/common.css">	
	<link rel="stylesheet" href="/public/styles/main.css">	
	<link rel="stylesheet" href="/public/styles/preview.css">	
	<link rel="stylesheet" href="/public/styles/media.css">	
	<!-- SLICK SLIDER -->
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
	<!-- JQUERY -->
	<link href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" rel="stylesheet"/>

	<!-- FONTS -->
	<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
	<title><?= $_SESSION['pageTitle'] ?></title>
</head>
<body>

<!-- LIBRARIES -->
<script src="/public/JS/min.jquery.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.1.62/jquery.inputmask.bundle.js"></script>
<script src="https://rawgit.com/notifyjs/notifyjs/master/dist/notify.js"></script>
<script src="/public/JS/pop.up.window.js"></script>

<!-- HTML PART INCLUDES -->
<?
	include "/app/views/modules/preview.php";
?>
<div class="preloader"></div>
<div class="wrapper">
	<div class="inner-wrapper">	
		<?php include "/app/views/modules/header.nav.bar.php" ?>
