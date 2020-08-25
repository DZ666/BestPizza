		</div>		
	</div>
</div>
<footer id="footer">
  <div class="inner-footer">
    <hr>
    <div class="footer-info">
      <div class="site-name">BestPizza © <?= date("Y"); ?></div>
      <a href="mailto:danililin858@gmail.com" target="_blank">danililin858@gmail.com</a>
    </div>
  </div>
</footer>
<?
  if ($_SESSION['in_amount'] > 1) {
    echo '<script src="/public/JS/skip.preview.js"></script>';
  } else {
    ?>
      <script>
        localStorage.setItem('current_valute', 'USD')
      </script>
    <?
  }
?>
<script src="/public/JS/Good.js"></script>
<script src="/public/JS/main.js"></script>
<? if ($_SERVER['REQUEST_URI'] === '/Pizza') {  ?>
  <script src="/public/JS/all.pizza.js"></script>
<? } ?>
<? if ($_SERVER['REQUEST_URI'] === '/Basket') {  ?>
  <script src="/public/JS/all.orders.js"></script>
<? } ?>
<? if ($_SERVER['REQUEST_URI'] === '/Snacks') {  ?>
  <script src="/public/JS/snacks.js"></script>
<? } ?>
<? if ($_SERVER['REQUEST_URI'] === '/account') {  ?>
  <script src="/public/JS/order.history.js"></script>
<? } ?>
</body>
</html>