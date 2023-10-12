<template>
<form id="login-form">
  <!-- Email input -->
  <div class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Tải khoản</label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Mật khẩu</label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31">Ghi nhớ đăng nhập</label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="#!">Quên mật khẩu?</a>
    </div>
  </div>

  <!-- Submit button -->
  <div class="text-center">
    <button type="button" class=" btn btn-primary btn-block mb-4 loginForm-button">Đăng nhập</button>
  </div>

  <!-- Register buttons -->
  <div class="text-center">
    <p>Không phải thành viên? <a href="#!">Đăng ký</a></p>
  </div>
</form>
</template>

<script>
</script>

<style>
</style>