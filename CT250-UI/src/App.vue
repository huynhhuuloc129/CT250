<template>
  <div id="app">
    <div>
      <app-header/>
      <router-view />
      <app-footer/>
    </div>
  </div>
</template>


<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {

  },
  computed: {
  },

  methods: {
  },
}
</script>


<style> 
body {
  width: 100vw;
  height: 100vh;
}
#app {
  height: 100%;
  background-image: url("./assets/Wallpaper.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>