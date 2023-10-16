<template>
  <form id="registerForm">

  <div class="form-floating">
    <input type="text" class="form-control" id="registerInputUsername" placeholder="" required>
    <label for="registerInputUsername" >Tài khoản</label>
  </div>

  <div class="form-floating">
    <input type="email" class="form-control" id="registerInputEmail1" aria-describedby="emailHelp" placeholder="" required>
    <label for="registerInputEmail1" >Địa chỉ email</label>
    <small id="emailHelp" class="form-text text-muted">Email của bạn sẽ không được chia sẻ với bất cứ ai</small>
  </div>

  <div class="form-floating">
    <input type="password" class="form-control" id="registerInputPassword1" placeholder="" required>
    <label for="registerInputPassword1" >Mật khẩu</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" id="registerInputFirstname"  placeholder="" required>
    <label for="registerInputFirstname" >Họ</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" id="registerInputLastname" placeholder="" required>
    <label for="registerInputLastname" >Tên</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" id="registerInputCitizenID" placeholder="" required>
    <label for="registerInputCitizenID" >Căn cước công dân</label>
  </div>

  <div class="form-floating">
    <select class="form-select form-select-sm" id="floatingSelect" aria-label=".form-select-sm role"  required>
      <option value="1">Chủ trọ</option>
      <option value="2">Người thuê trọ</option>
    </select>
    <label for="floatingSelect">Chọn vai trò cần đăng ký</label>

  </div>
  <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
    <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button">Đăng ký</button>
  </div>
</form>
</template>
  
  <script>
  </script>
  
  <style>

#registerForm {
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.form-floating{
  margin-bottom: 20px;
}
#registerButton{
  text-align: center;
}
.registerForm-button{
  color: #FFF0DC;
  background-color: #0F2C59;
}
  </style>