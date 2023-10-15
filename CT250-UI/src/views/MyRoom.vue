<template>

</template>

<script>

export default {
    data() {
        return {
        };
    },
    components: {
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
</style>