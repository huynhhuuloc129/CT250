<template>
  <div id="app">
    <div>
      <app-header v-if="visible" />
      <router-view @isShowHeaderAndFooter="handleHeaderAndFooter" />
      <app-footer v-if="visible" />
    </div>
  </div>
</template>


<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      isShowHeaderAndFooter: false,
    };
  },
  computed: {
    visible() {
      return this.isShowHeaderAndFooter;
    },
  },

  methods: {
    handleHeaderAndFooter(status) {
      this.isShowHeaderAndFooter = status;
    },
  },
  mounted() {

  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;700&family=Lalezar&family=Lobster&family=Roboto+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Tilt+Neon&display=swap');

body {
  height: 100vh;
}

/* label {
  color: rgb(175, 175, 175);
} */

html::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

html::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

html::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(122, 153, 217)),
      color-stop(0.72, rgb(73, 125, 189)),
      color-stop(0.86, rgb(28, 58, 148)));
}

#app {
  font-family: 'inter';
}
</style>