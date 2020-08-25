
<div class="login-wrapper w100 flex jc-c ali-c">
	<form action="/app/libs/log_and_reg.php" class="login-form flex ali-strc" method="POST">
		<div class="log-inner-wrapper flex wrap ali-fs jc-c">
			<div class="w100 flex jc-c">
				<h2 class="flex jc-c ali-fs">Регистрация</h2>
			</div>
			<div class="w100 flex wrap jc-c ali-c">
				
				<div class="relative w100 flex jc-c">
					<label for="login" class="login-fa-ico"></label>
						<input id="login" class="w60 inputPlace" name="login" type="text" placeholder="Логин">
				</div>

				<div class="relative w100 flex jc-c">
					<label for="email" class="email-fa-ico"></label>
						<input id="email" class="w60 inputPlace" name="email" type="email" placeholder="E-mail">
				</div>
				
				<div class="relative w100 flex jc-c">
					<label for="pass" class="pass-fa-ico"></label>
						<input id="pass" class="w60 inputPlace" name="pass" type="password" placeholder="Пароль">
				</div>

				<div class="relative w100 flex jc-c">
					<label for="pass" class="pass-fa-ico"></label>
						<input id="repass" class="w60 inputPlace" name="repass" type="password" placeholder="Повторить пароль">
				</div>

			</div>
			<div class="w100 flex jc-c ali-c">
				<input name="reginBTN" class="logInBTN" type="submit" value="Регистрация">
			</div>
			<a class="forgot-pass" href="/account/login">Войти</a>
		</div>
	</form>
</div>
<script src="/public/JS/LogReg.js"></script>