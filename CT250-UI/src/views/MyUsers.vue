<template></template>

<script>
import userService from '@/services/user.service';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            user: {},
            lessor: {},
            users: [],
        }
    },
    components: {
    },
    methods: {
        async checkLogin() {
            try {
                var tokenBearer = this.$cookies.get("Token");
                this.user = await userService.getCurrentUser(tokenBearer);
                this.lessor = this.user.lessor;
                // console.log(this.lessor)

            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },

        async getAllUsers() {
            try {
                var tokenBearer = this.$cookies.get("Token");
                this.users = await userService.getAllUsers(tokenBearer);
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        displaySuccess(message) {
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1000
            })
        },
        displayError(message) {
            Swal.fire({
                title: 'Lỗi!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        },
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
    },
    async mounted() {
        await this.checkLogin();
        this.showHeaderAndFooter();
        this.getAllUsers();
    }
}
</script>

<style>
.MyRoomingHouse-tabpanel,
.tab-content {
    margin: 10px;
}

#MyRoomingHouse {
    width: 80%;
    margin: auto;
    margin-top: 50px;
}

#AppHeader {
    position: static;
    background-color: #0F2C59;
}
</style>