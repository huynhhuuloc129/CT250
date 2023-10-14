<template>
<img id="UserHomePage-wallpaper" src="../assets/home-page-background.jpg" alt="">

<div class="input-group rounded" id="homePage-search-bar">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button class="input-group-text border-0" id="search-addon">
    <font-awesome-icon icon="search" />
  </button>
</div>

<div id="UserHomePage-category">
  <div><font-awesome-icon icon="house-user"/> Nhà trọ</div>
  <div><font-awesome-icon icon="house"/> Khu trọ</div>
</div>

<hr>

<div id="UserHomePage-listRoom">
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
  <roomCard/>
</div>
</template>

<script>
import roomCard from "../components/RoomCard.vue"    
export default {
    
    data() {
        return {
            
        };
    },
    components: {
        roomCard,
    },
    computed: {

    },
    methods: {
      showHeaderAndFooter() {
        this.$emit("isShowHeaderAndFooter", true);
      },
    },
    mounted(){
      this.showHeaderAndFooter();
    }
}
</script>

<style>

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