<template>
  <form id="registerForm">

    <div class="form-floating">
      <input type="text" class="form-control" v-model="category" id="registerCategory"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerCategory">Loại hình cho thuê</label>
    </div>

    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomingHouseRequest.name" id="registerInputName"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputName">Tên trọ</label>
    </div>

    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomingHouseRequest.description" id="registerInputDescription"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputDescription">Mô tả</label>
    </div>

    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomingHouseRequest.address" id="registerInputAddress"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputAddress">Địa chỉ</label>
    </div>

    <div class="form-floating">
      <input type="date" class="form-control" v-model="roomingHouseRequest.paymentExpiresDate" id="registerInputPaymentExpiresDate"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputPaymentExpiresDate">Ngày hết hạn đóng tiền</label>
    </div>

  
    <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
      <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button" v-on:click="onSignup"
        :disabled="buttonDisabled">Thêm trọ</button>
    </div>
  </form>
</template>
    
<script>
export default {
  data() {
    return {
      buttonDisabled: false,
      roomingHouseRequest: {
        "categoryId": 0,
        "name": "",
        "description": "",
        "address": "",
        "paymentExpiresDate": "1000-1-1"
      },
      catetgory: ""
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

.form-floating {
  margin-bottom: 20px;
}

#registerButton {
  text-align: center;
}

.registerForm-button {
  color: #FFF0DC;
  background-color: #0F2C59;
}
</style>