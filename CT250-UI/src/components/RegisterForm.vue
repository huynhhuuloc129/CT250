<template>
  <form id="registerForm">

  <div class="form-group">
    <label for="registerInputUsername" >Tài khoản</label>
    <input type="text" class="form-control" id="registerInputUsername"  placeholder="Username" required>
  </div>

  <div class="form-group">
    <label for="registerInputEmail1" >Địa chỉ email</label>
    <input type="email" class="form-control" id="registerInputEmail1" aria-describedby="emailHelp" placeholder="Email" required>
    <small id="emailHelp" class="form-text text-muted">Email của bạn sẽ không được chia sẻ với bất cứ ai</small>
  </div>

  <div class="form-group">
    <label for="registerInputPassword1" >Mật khẩu</label>
    <input type="password" class="form-control" id="registerInputPassword1" placeholder="Password" required>
  </div>

  <div class="form-group">
    <label for="registerInputFirstname" >Họ</label>
    <input type="text" class="form-control" id="registerInputFirstname"  placeholder="First name" required>
  </div>

  <div class="form-group">
    <label for="registerInputLastname" >Tên</label>
    <input type="text" class="form-control" id="registerInputLastname"  placeholder="Last name" required>
  </div>

  <div class="form-group">
    <label for="registerInputCitizenID" >Căn cước công dân</label>
    <input type="text" class="form-control" id="registerInputCitizenID"  placeholder="Citizen ID" required>
  </div>


  <select class="form-select form-select-sm" aria-label=".form-select-sm role" required>
    <option selected>Chọn role cần đăng ký</option>
    <option value="1">Chủ trọ</option>
    <option value="2">Người thuê trọ</option>
  </select>

  <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
    <button type="submit" id="registerButton" class="btn btn-secondary">Đăng ký</button>
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
.form-group{
  padding: 10px;
}
#registerButton{
  text-align: center;
}
  </style>