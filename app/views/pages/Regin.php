<div class="auth-wrapper">
  <form action="/auth/registration" method="post" class="form form-login">
    <h1 class="title">Registration</h1>
    <div class="form__input">
      <input id="name" type="text" name="name" class="input" placeholder="Name">
      <label for="name">Name</label>
    </div>
    <div class="form__input">
      <input id="surename" type="text" name="surename" class="input" placeholder="Surename">
      <label for="surename">Surename</label>
    </div>
    <div class="form__input">
      <input id="email" type="email" name="email" class="input" placeholder="E-mail">
      <label for="email">Email</label>
    </div>
    <div class="form__input">
      <input id="password" type="password" name="password" class="input" placeholder="password">
      <label for="password">Password</label>
    </div>
    <div class="form__input submit-wrapper">
      <input type="submit" class="input submit" value="Reg In">
      <a class="link" href="/auth">Log In</a>
    </div>
  </form>
  <? if ($_SESSION['auth-fail']) {
    $c = 0;
    if ($_SESSION['auth-fail'] !== undefined) {
      ?>
        <h3 class="alert-fail alert"><?= $_SESSION['auth-fail'] ?></h3>
      <?
    }
    $c += 1;
    if ($c === 1) {
      $_SESSION['auth-fail'] = undefined;
      $c = 0;
    } 
  } ?>
</div>