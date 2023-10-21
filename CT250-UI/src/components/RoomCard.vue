<template>
  <ul id="RoomCard-ul">
    <li v-for="room in rooms">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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