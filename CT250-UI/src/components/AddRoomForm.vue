<template>
  <form id="registerForm">

    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomRequest.name" id="registerInputName"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputName">Tên phòng</label>
    </div>

    <div class="form-floating">
      <input type="number" class="form-control" v-model="roomRequest.width" id="registerInputWidth"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputWidth">Chiều rộng</label>
    </div>

    <div class="form-floating">
      <input type="number" class="form-control" v-model="roomRequest.height" id="registerInputHeight"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputHeight">Chiều cao</label>
    </div>

    <div class="form-floating">
      <input type="number" class="form-control" v-model="roomRequest.roomPrice" id="registerInputPrice"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputPrice">Giá phòng</label>
    </div>

    <div class="form-floating">
      <input type="number" class="form-control" v-model="roomRequest.waterPrice" id="registerInputWaterPrice"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputWaterPrice">Giá nước</label>
    </div>

    <div class="form-floating">
      <input type="number" class="form-control" v-model="roomRequest.electricityPrice" id="registerInputElectricityPrice"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputElectricityPrice">Giá điện</label>
    </div>

    <div class="form-floating">
      <input type="textarea" class="form-control" v-model="roomRequest.summary" id="registerInputSummary"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputSummary">Mô tả tổng quan</label>
    </div>

    <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
      <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button" v-on:click="onSignup"
        :disabled="buttonDisabled">Thêm phòng</button>
    </div>
  </form>
</template>
    
<script>
export default {
  data() {
    return {
      buttonDisabled: false,
      roomRequest: {
        "name": "",
        "width": 0,
        "height": 0,
        "roomPrice": 0,
        "waterPrice": 0,
        "electricityPrice": 0,
        "summary": "",
      },
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