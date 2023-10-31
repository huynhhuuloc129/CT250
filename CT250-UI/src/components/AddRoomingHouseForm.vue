<template>
  <form id="registerForm">

    <div class="form-floating">
      <select class="form-select form-select-sm" v-model="roomingHouseRequest.categoryId" id="floatingSelect"
        @focus="buttonDisabled = false" aria-label=".form-select-sm role" required>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
      <label for="floatingSelect">Chọn loại hình cho trọ</label>
    </div>

    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomingHouseRequest.name" id="registerInputName"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputName">Tên trọ</label>
    </div>

    <div class="form-group" style="margin-bottom: 20px;">
      <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Mô tả cho khu trọ" rows="3" v-model="roomingHouseRequest.description" required></textarea>
    </div>



    <div class="form-floating">
      <input type="text" class="form-control" v-model="roomingHouseRequest.address" id="registerInputAddress"
        @focus="buttonDisabled = false" placeholder="" required>
      <label for="registerInputAddress">Địa chỉ</label>
    </div>

    <div class="form-floating">
      <select class="form-select" aria-label="Default select example" v-model="roomingHouseRequest.paymentExpiresDay" required>
        <option selected>Chọn ngày</option>
        <option v-for="i in 31" :value="i">{{ i }}</option>
      </select>
      <label for="registerInputPaymentExpiresDate">Ngày hết hạn đóng tiền</label>
    </div>


    <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
      <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button" v-on:click="onAddRoomingHouse"
        :disabled="buttonDisabled">Thêm trọ</button>
    </div>
  </form>
</template>
    
<script>
import categoryService from '@/services/category.service';
export default {
  data() {
    return {
      buttonDisabled: false,
      roomingHouseRequest: {
        "categoryId": 0,
        "name": "",
        "description": "",
        "address": "",
        "paymentExpiresDay": 0
      },
      catetgory: "",
      categories: []
    }
  },
  methods: {
    onAddRoomingHouse() {
      this.buttonDisabled = true;
      this.$emit("submit", this.roomingHouseRequest);
    },
    async retrieveCategories() {
      try {
        this.categories = await categoryService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.retrieveCategories();
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