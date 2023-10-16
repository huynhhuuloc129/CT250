<template>
<form id="login-form">
  <div class="form-floating mb-4">
    <input id="form2Example1" class="form-control" placeholder=""/>
    <label class="form-label" for="form2Example1">Tài khoản</label>
  </div>

  <div class="form-floating mb-4">
    <input type="password" id="form2Example2" class="form-control" placeholder=""/>
    <label class="form-label" for="form2Example2">Mật khẩu</label>
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31">Ghi nhớ đăng nhập</label>
      </div>
    </div>

    <div class="col">
      <a href="#!">Quên mật khẩu?</a>
    </div>
  </div>

  <div class="text-center">
    <button type="button" class=" btn btn-primary btn-block mb-4 loginForm-button">Đăng nhập</button>
  </div>

</form>
</template>

<script>
</script>

<style>
#login-form{
  margin: 20px;
}
.loginForm-button{
  color: #FFF0DC;
  background-color: #0F2C59;
}
.loginForm-button:hover{
  background-color: #1b3f75;
}
</style>