<template>
  <ul id="RoomCard-ul">
    <li v-for="roomingHouse in roomingHouses">
      <div class="card" style="width: 18rem;">
        <div style="height: 200px; width: auto;">
          <img style="height: 100%;" v-if="roomingHouse.photos != null && roomingHouse.photos.length > 0"
            class="card-img-top" :src="roomingHouse.photos[0].url" alt="Card image cap">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ roomingHouse.name }}</h5>
          <p class="card-text overflow-auto" style="height: 6rem;">{{ roomingHouse.description }}</p>
          <a class="btn btn-primary" style="background-color: #2c5596;" @click="goToRoomingHouseInfo(roomingHouse.id)">Chi
            tiết</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    roomingHouses: { type: Array, default: [] },
  },
  methods: {
    async goToRoomingHouseInfo(id) {
      this.$router.push({ name: "rooming house info", params: { id: id } })
    }
  }
}
</script>

<style>
.card-text {
  overflow-y: scroll;
}

#RoomCard-ul {
  justify-content: center;
  list-style-type: none;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
</style>