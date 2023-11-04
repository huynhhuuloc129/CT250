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

    <div class="form-group" style="margin-bottom: 20px;">
      <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Mô tả tổng quan" rows="3"
        v-model="roomRequest.summary" required></textarea>
    </div>

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="enableDescription" value="enable"
        @click="enableDescription = !enableDescription" true-value="true" false-value="false">
      <label class="form-check-label" for="enableDescription">Thêm mô tả chi tiết</label>
    </div>

    <div v-if="enableDescription">
      <div id="form-row-add">
        <div v-for="i in countDes" class="form-row" style="display: flex; flex-direction: row; margin-bottom: 10px;">
          <div class="col-6">
            <input type="text" class="form-control" placeholder="Tiêu đề" v-model="roomDescriptions[i - 1].title">
          </div>
          <div class="col-6">
            <input type="text" class="form-control" placeholder="Nội dung" v-model="roomDescriptions[i - 1].content">
          </div>
        </div>
      </div>
      <button :disabled="disabled" type="button" style="width: 100%;" class="btn btn-secondary"
        @click.stop.prevent="addRoomDescription">+</button>
    </div>

    <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
      <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button" v-on:click="onAddRoom"
        :disabled="buttonDisabled">Thêm phòng</button>
    </div>

  </form>
</template>
    
<script>
export default {
  data() {
    return {
      disabled: false,
      enableDescription: false,
      buttonDisabled: false,
      roomRequest: {
        "name": "",
        "width": 0,
        "height": 0,
        "roomPrice": 0,
        "waterPrice": 0,
        "electricityPrice": 0,
        "summary": "",
        "descriptions": []
      },
      roomDescriptions: [
        {
          "title": "",
          "content": ""
        }
      ],
      countDes: 1
    }
  },
  methods: {
    onAddRoom() {
      this.buttonDisabled = true;
      if (this.enableDescription) {
        this.roomRequest.descriptions = this.roomDescriptions
      }
      this.$emit("submit", this.roomRequest);
    },

    addRoomDescription() {
      this.countDes++;
      this.roomDescriptions.push(
        {
          "title": "",
          "content": ""
        }
      )
    },
  },
  mounted() {
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