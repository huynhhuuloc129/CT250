<template>
  <img id="UserHomePage-wallpaper" src="../assets/home-page-background.jpg" alt="">

  <div class="input-group rounded" id="homePage-search-bar">
    <input type="search" id="search-bar" class="form-control rounded" v-model="search" placeholder="Tìm kiếm trên IStay"
      aria-label="Search" aria-describedby="search-addon" />
  </div>

  <div id="UserHomePage-category">
    <div class="category-icon" @click="searchByRoom()"><font-awesome-icon icon="house-user"/> Phòng trọ</div>
    <div class="category-icon" @click="searchByRoomingHouse()"><font-awesome-icon icon="house" /> Khu trọ</div>
  </div>

  <div id="UserHomePage-listRoom">
    <roomCard v-if="active == 'room'" :rooms="filteredRooms" />
    <roomingHouseCard v-if="active == 'rooming house'" :roomingHouses="filteredRoomingHouses" />

  </div>
</template>

<script>
import roomCard from "@/components/RoomCard.vue"
import roomingHouseCard from "@/components/RoomingHouseCard.vue"
import roomService from "@/services/room.service";
import userService from "@/services/user.service"
import roomingHouseService from "@/services/roomingHouse.service";
export default {
  data() {
    return {
      rooms: [],
      search: "",
      filteredRoom: [],
      roomingHouses: [],
      active: "room"
    }
  },
  components: {
    roomCard,
    roomingHouseCard
  },
  computed: {
    filteredRooms() {
      return this.rooms.filter(p => {
        return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
    filteredRoomingHouses() {
      return this.roomingHouses.filter(p => {
        return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
    listRooms() {
      return this.rooms;
    },
  },
  methods: {
    async searchByRoom(){
      this.active = 'room'
    },
    async searchByRoomingHouse(){
      this.active = 'rooming house'
    },  
    async checkLogin() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        let user = await userService.getCurrentUser(tokenBearer);
        if (tokenBearer == null) throw new Error('Not login');
      } catch (error) {
        this.$router.push({ name: "login" });
        alert(error);
      }
    },
    async retrieveRoomingHouse() {
      try {
        this.roomingHouses = await roomingHouseService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async retrieveRooms() {
      try {
        this.rooms = await roomService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    delete_cookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  mounted() {
    this.showHeaderAndFooter();
    this.checkLogin();
    this.retrieveRooms();
    this.retrieveRoomingHouse();
  }
}
</script>

<style>
#search-bar {
  border-radius: 50%;
}

#AppHeader {
  background-color: rgb(138, 137, 135);
}

#app {
  background-image: none;
}

.category-icon {
  text-align: center;
  width: 190px;
  cursor: pointer;
  padding: 5px;
  border: 1px solid black;
  border-bottom: 0px;
  border-radius: 20px 20px 0px 0px;
}

#UserHomePage-listRoom,
#UserHomePage-category {
  display: flex;
  align-items: center;
  Justify-content: center;
  padding: 20px;
  gap: 20px;
}

#UserHomePage-listRoom {
  flex-wrap: wrap;
}

#UserHomePage-category {
  border-bottom: 1px solid black;
  padding-bottom: 0px;
  font-size: 25px;
  font-weight: bold;
}

#UserHomePage-wallpaper {
  position: relative;
  width: 100%;
  height: auto;
  z-index: -5;
}

#homePage-search-bar {
  position: relative;
  top: -10vh;
  width: 60%;
  margin: auto;
}</style>