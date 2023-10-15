<template>
<div id="MyRoom-Information">
  <div id="MyRoom-Information1">
    <h1 >{{ room.name }}</h1>
    <hr>
    <div>
      Description: 
      {{ room.summary }} wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
    </div>
    <div>Giá điện: {{ room.electricityPrice }}</div>
    <div>Giá nước: {{ room.waterPrice }}</div>
    <div>Giá phòng: {{ room.roomPrice }}</div>
    <div>Rộng: {{ room.width }} x Dài: {{ room.height }}</div>
    <div>Diện tích: {{ room.dimensions }}</div>
    <div></div>
  </div>

  <div id="MyRoom-Information2">
    Trạng thái phòng: {{ roomingSubscription.state }}
    <hr>
    <button type="button" class="btn btn-danger">Hủy đăng ký</button>
  </div>
</div>
</template>

<script>
import room from "@/services/room.service";
import roomingSubscriptionService from "@/services/roomingSubscription.service";

export default {
  data() {
      return {
          roomingSubscriptionArr: [],
          roomingSubscription: {},
          room: {},
      };
  },

  components: {

  },

  computed: {
    getRoom() {
      return this.room;
    },
    getRoomingSubscription() {
      return this.roomingSubscription;
    }
  },

  methods: {
    async retrieveRoom() {
      try {
        this.roomingSubscriptionArr = await roomingSubscriptionService.getByLessorId(2);
        this.roomingSubscription = this.roomingSubscriptionArr[0];
        this.room = await room.getOne(this.roomingSubscription.roomId);
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  mounted(){
    this.showHeaderAndFooter();
    this.retrieveRoom();
  }
}
</script>

<style>
#MyRoom-Information {
  margin: 100px;
  justify-content: space-around;
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
  margin: 100px;
  display: flex;
  flex-direction: column;
  width: 40%;
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