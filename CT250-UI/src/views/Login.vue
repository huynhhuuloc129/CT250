<template>
<div id="login-session">
    <div class="login-title container align-self-center">
        <p id="title">IStay</p>
        <p id="quote">Find your comfort</p>
        <button type="button" class="login-button" data-bs-toggle="modal" data-bs-target="#loginModal">
            Đăng nhập
        </button>
        <div id="login-register">Không phải thành viên? <span id="login-register-button" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</span></div>
    </div>

    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Đăng nhập</h5>
                    <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <loginForm @submit="onLogin"/>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Đăng ký</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <registerForm @submit="onSignup"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import loginForm from "@/components/LoginForm.vue"   
import registerForm from "@/components/RegisterForm.vue" 
import userService from "@/services/user.service"
import { useCookies } from "vue3-cookies";

export default {
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    data() {
        return {
            user: {}
        };
    },
    components: {
        loginForm,
        registerForm
    },
    computed: {

    },
    methods: {
        async checkLogin(){
            try {
            var tokenBearer = this.$cookies.get("Token");
            let user = await userService.getCurrentUser(tokenBearer);
            if (user.role == "tenant" ) 
                    this.$router.push({ name: "home_page" });
            else if (user.role == "lessor" )  this.$router.push({name: "lessor home page"});
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async onLogin(user) {
            try {
                document.getElementById("login-form-close-btn").click();
                const loginData = await userService.login(user);
                this.$cookies.set("Token", 'Bearer ' + loginData.accessToken);

                let currentUser = await userService.getCurrentUser('Bearer ' + loginData.accessToken)
                if (currentUser.role == "tenant" ) 
                    this.$router.push({ name: "home_page" });
                else this.$router.push({name: "lessor home page"});
            } catch (err) {
                alert(err)
           }
        },
        async onSignup(user, role) {
            try {
                if (role == "lessor") {
                    await userService.signUpLessor(user);
                } else {
                    await userService.signUpTenant(user);
                }
                this.$router.go();
            } catch (err) {
                alert(err)
            }
        },
        hideHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", false);
        },
    },
    mounted(){
        this.hideHeaderAndFooter();
        this.checkLogin();
    }
}
</script>

<style>
#app {
  height: 100%;
  background-image: url("../assets/Wallpaper.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#title{
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    font-family: 'Lalezar'; 
    font-size: 60px;
}
#loginTitle{
    position: relative;
    left: 39%;
}
#login-register-button{
    cursor: pointer;
    text-decoration: underline;
}
#login-register-button:hover{
    color: #0F2C59;
}
#login-register{
    font-family: 'inter'; 
    font-style: italic;
}
#quote{
    font-family: 'inter'; 
    font-style: italic;
    font-size: 30px;
}

.login-title{
    
    color: #FFF0DC;
    position: fixed;
    top: 35%;
    left: 10%;
}

.login-button{
    color: #FFF0DC;
    font-size: 30px;
    border-radius: 50px;
    padding: 15px 30px;
    background-color: #0F2C59;
}

.login-button:hover{
    background-color: #1b3f75;
}



</style>