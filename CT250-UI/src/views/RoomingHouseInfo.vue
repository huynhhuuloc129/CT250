<template>
<div style="width: 80%; align-items: center; margin: auto;">
  <div id="MyRoom-Information">
    <div id="MyRoom-Information1">
      <div>
        <h1 style="text-align: center;">{{ roomingHouse.name }}</h1>  <!--TODO: remove Room Engineer-->
    
        <hr>
        <div> <!--TODO: remove text-->
          Description: 
          {{ roomingHouse.description }} 
        </div>
      </div>
      <hr>
    </div>

    <div  style=" width: 40%;">
      <div id="MyRoom-Information2">
        <div class="myroom-fee">Địa chỉ: <div>{{ roomingHouse.address }}</div></div>
        <div class="myroom-fee">Số phòng: <div>{{ roomingHouse.totalRoomNumber }}</div></div>
        <div class="myroom-fee">Số phòng còn trống: <div>{{ roomingHouse.availableRoomNumber }}</div></div>
        <div class="myroom-fee">Ngày trả tiền hàng tháng: <div>{{ roomingHouse.paymentExpiresDate }}</div></div>
      </div>
    </div>
  </div>


  <p>
    <div style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      <h4 id="listRoomsHeader">Những phòng trọ của khu trọ này:</h4>
    </div>
  </p>
  <div class="collapse" id="collapseExample">
    <div class="card card-body" v-for="room in rooms">

      <img class="rounded-3" style="width: 300px; margin-right: 20px;" src="@/assets/room-info.jpg" alt="">

      <div>
        <h4>{{ room.name }}</h4>
        <div>{{ room.summary }}</div>
        <br>
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
          <div style="font-weight: bold; font-size: large;">Tiền phòng hàng tháng: <div style="color: red;">{{ room.roomPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }}</div></div>
          <button class="btn btn-primary" @click="goToRoomInfo(room.id)">Xem chi tiết</button>
        </div>

      </div>
      
    </div>
  </div>


</div>
</template>

<script>
import review from "@/components/Review.vue";

import roomService from "@/services/room.service";
import userService from "../services/user.service";
import roomingHouseService from "@/services/roomingHouse.service";

export default {
  data() {
    return {
        roomingHouseArr: [],
        roomingHouse: {},
        rooms: [],
        user: {},
    };
  },

  components: {
    review
  },

  computed: {
  },

  methods: {
    async goToRoomInfo(id){
      this.$router.push({name: "room info", params: {id: id}})
    },
    async checkLogin(){
        try {
          var tokenBearer = this.$cookies.get("Token");
          this.user = await userService.getCurrentUser(tokenBearer);
        } catch (error) {
            alert(error);
            this.$router.push({ name: "login" });
        }
      },
    async retrieveRoomingHouse() {
      try {
        this.roomingHouseArr = await roomingHouseService.getByTenantID(3); //TODO: Using real ID
        this.roomingHouse = this.roomingHouseArr[0] //TODO: Using array instead of 1 element
        this.retrieveRooms(this.roomingHouse.id)
      } catch (err) {
        console.log(err);
      }
    },
    async retrieveRooms(id) {
      try {
        this.rooms = await roomService.getAllByRoomingHouseID(id); // TODO: Pass the current use ID NOT SOME RANDOM ID
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  mounted(){
    this.checkLogin();
    this.showHeaderAndFooter();
    this.retrieveRoomingHouse();
  }
}
</script>

<style>
.myroom-fee{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-body{
  display: flex;
  flex-direction: row;
}
#listRoomsHeader{
  text-decoration: underline;
}
#listRoomsHeader:hover{
  color: rgb(200, 203, 178);
}
hr{
  margin-top: 50px;
}
#MyRoom-Information{
  margin: 50px 0px 0 0px;
}
#MyRoom-Information {
  justify-content: space-between;
  font-size: large;
  display: flex;
  width: calc(100% - 100px);
}
#MyRoom-Information1 {
  word-wrap: break-word;
  width: 50%;
}
#MyRoom-Information2 {
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
#app{
  overflow: hidden;
}
#AppHeader {
  position: static;
  background-color: #0F2C59;
}
</style>