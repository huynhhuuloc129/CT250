<template>
  <div id="app">
    <div>
      <app-header v-if="visible" />
      <router-view @isShowHeaderAndFooter="handleHeaderAndFooter"/>
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
}
</script>


<style> 
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;700&family=Lalezar&display=swap');

body {
  height: 100vh;
}

</style>