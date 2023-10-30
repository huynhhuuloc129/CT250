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
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
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


<style> @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;700&family=Lalezar&family=Tilt+Neon&display=swap');

 body {
   height: 100vh;
 }

 label {
   color: rgb(175, 175, 175);
 }

body::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

body::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}

 #app {
   font-family: 'Tilt Neon';
 }</style>