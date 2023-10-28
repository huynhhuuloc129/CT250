<template>
<img id="UserHomePage-wallpaper" src="../assets/home-page-background.jpg" alt="">

<div class="input-group rounded" id="homePage-search-bar">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button class="input-group-text border-0" id="search-addon">
    <font-awesome-icon icon="search" />
  </button>
</div>

<div id="UserHomePage-category">
  <div class="category-icon"><font-awesome-icon icon="house-user"/> Phòng trọ</div>
  <div class="category-icon"><font-awesome-icon icon="house"/> Khu trọ</div>
</div>

<div id="UserHomePage-listRoom">
  <roomCard :rooms="listRooms"/>
</div>
</template>

<script>
import roomCard from "@/components/RoomCard.vue"    
import roomService from "@/services/room.service";
import userService from "../services/user.service"

export default {
    data() {
        return {
            rooms: [],
        };
    },
    components: {
        roomCard,
    },
    computed: {
      listRooms() {
        return this.rooms;
      },
    },
    methods: {
      async checkLogin(){
        try {
          var tokenBearer = this.$cookies.get("Token");
          let user = await userService.getCurrentUser(tokenBearer);

          if (user.role != "lessor") this.$router.push("home page");
        } catch (error) {
            // alert(error);
            this.$router.push({ name: "login" });
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
    },
    mounted(){
      this.showHeaderAndFooter();
      this.checkLogin();
      this.retrieveRooms();
    }
}
</script>

<style>
.category-icon{
  text-align: center;
  width: 190px;
  cursor: pointer;
  padding: 5px;
  border: 1px solid black;
  border-bottom: 0px;
  border-radius: 20px 20px 0px 0px;
}
#UserHomePage-listRoom, #UserHomePage-category{
  display: flex;
  align-items: center;
  Justify-content: center;
  padding: 20px;
  gap: 20px;
}

#UserHomePage-listRoom{
  flex-wrap:wrap;
}

#UserHomePage-category{
  border-bottom: 1px solid black;
  padding-bottom: 0px;
  font-size: 25px;
  font-weight:bold;
}

#UserHomePage-wallpaper {
  position: relative;
  width: 100%;
  height: auto;
  z-index: -5;
}

#homePage-search-bar{
  position: relative;
  top: -10vh;
  width: 60%;  
  margin: auto;
}
</style>