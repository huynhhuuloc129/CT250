<template>
  <ul id="RoomCard-ul">
    <li v-for="room in rooms">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="@/assets/room-info.jpg" alt="Card image cap"> <!--TODO: Fix url-->
        <div class="card-body">
          <h5 class="card-title">{{ room.name }}</h5>
          <p class="card-text">{{ room.summary }}</p>
          <a class="btn btn-primary" @click="goToRoomInfo(room.id)">Chi tiết</a>
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