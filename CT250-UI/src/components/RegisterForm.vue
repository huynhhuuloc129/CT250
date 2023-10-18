<template>
<form id="registerForm" >

  <div class="form-floating">
    <input type="text" class="form-control" v-model="user.username" id="registerInputUsername"  @focus="buttonDisabled = false" placeholder="" required>
    <label for="registerInputUsername" >Tài khoản</label>
  </div>

  <div class="form-floating">
    <input type="email" class="form-control" v-model="user.email" id="registerInputEmail1"  @focus="buttonDisabled = false" aria-describedby="emailHelp" placeholder="" required>
    <label for="registerInputEmail1" >Địa chỉ email</label>
    <small id="emailHelp" class="form-text text-muted">Email của bạn sẽ không được chia sẻ với bất cứ ai</small>
  </div>

  <div class="form-floating">
    <input type="password" class="form-control" v-model="user.password" id="registerInputPassword"  @focus="buttonDisabled = false" placeholder="" required>
    <label for="registerInputPassword" >Mật khẩu</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" v-model="user.lastName" id="registerInputFirstname"  @focus="buttonDisabled = false"  placeholder="" required>
    <label for="registerInputFirstname" >Họ</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" v-model="user.firstName" id="registerInputLastname"  @focus="buttonDisabled = false" placeholder="" required>
    <label for="registerInputLastname" >Tên</label>
  </div>

  <div class="form-floating">
    <input type="text" class="form-control" v-model="user.citizenID" id="registerInputCitizenID"  @focus="buttonDisabled = false" placeholder="" required>
    <label for="registerInputCitizenID" >Căn cước công dân</label>
  </div>

  <div class="form-floating">
    <select class="form-select form-select-sm" v-model="role" id="floatingSelect"  @focus="buttonDisabled = false" aria-label=".form-select-sm role"  required>
      <option value="tenant">Chủ trọ</option>
      <option value="lessor">Người thuê trọ</option>
    </select>
    <label for="floatingSelect">Chọn vai trò cần đăng ký</label>

  </div>
  <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
    <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button" v-on:click="onSignup" :disabled="buttonDisabled">Đăng ký</button>
  </div>
</form>
</template>
  
<script>
export default {
  data() {
    return {
      buttonDisabled: false,
      user: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        citizenID: "",
        dob: "01/01/1001",
        gender: "male",
        address: "",
        tel: ""
      },
      role: "",
    }
  },
  methods: {
    onSignup() {
      this.buttonDisabled = true;
      this.$emit("submit", this.user, this.role);
    }
  }
}

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