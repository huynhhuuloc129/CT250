<template>
  <ul id="RoomCard-ul">
    <li v-for="room in rooms">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="@/assets/room-info.jpg" alt="Card image cap"> <!--TODO: Fix url-->
        <div class="card-body">
          <h5 class="card-title">{{ room.name }}</h5>
          <p class="card-text overflow-auto" style="height: 6rem;">{{ room.summary }}</p>
          <div style="display: flex; justify-content: space-between;">
            <a class="btn btn-primary" @click="goToRoomInfo(room.id)" style="background-color: #2c5596;">Chi tiết</a>
            <span>Giá tiền: <span style="color: red;">{{room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }}</span></span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    rooms: { type: Array, default: [] },
  },
  methods: {
    async goToRoomInfo(id){
      this.$router.push({name: "room info", params: {id: id}})
    }
  }
}
</script>

<style>
#RoomCard-ul{
  justify-content: center;
  list-style-type: none;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
</style>