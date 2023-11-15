<template>
    <div id="login-session">
        <div class="login-title container align-self-center">
            <p id="title">IStay</p>
            <p id="quote">Find your comfort</p>
            <button type="button" class="login-button" data-bs-toggle="modal" data-bs-target="#loginModal">
                Đăng nhập
            </button>
            <div id="login-register">Không phải thành viên? <span id="login-register-button" data-bs-toggle="modal"
                    data-bs-target="#registerModal">Đăng ký</span></div>
        </div>

        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true"
            data-backdrop="false">
            <div class="modal-dialog-centered modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginTitle">Đăng nhập</h5>
                        <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <loginForm @submit="onLogin" />
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true"
            data-backdrop="false">
            <div class="modal-dialog-centered modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginTitle">Đăng ký</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <registerForm @submit="onSignup" />
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
import Swal from 'sweetalert2'

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
        async checkLogin() {
            try {
                var tokenBearer = this.$cookies.get("Token");
                let user = await userService.getCurrentUser(tokenBearer);
                if (user.username.length > 0) {
                    this.$router.push({ name: "home_page" });
                }
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async onLogin(user) {
            try {
                this.$router.push({ name: "admin" });
                document.getElementById("login-form-close-btn").click();
                const loginData = await userService.login(user);
                this.$cookies.set("Token", loginData.accessToken);

                let currentUser = await userService.getCurrentUser(loginData.accessToken)
                this.$router.push({ name: "home_page" });
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async onSignup(user, role) {
            try {
                this.validateSignUpForm(user)
                if (role == "lessor") {
                    await userService.signUpLessor(user);
                } else {
                    await userService.signUpTenant(user);
                }
                await this.displaySuccess("Đăng ký thành công")
                await this.sleep(1000)
                this.$router.go();
            } catch (err) {
                this.displayError(err)
            }
        },
        validateSignUpForm(user) {
            if (user.username.length <= 6) throw new Error("Tài khoản phải dài hơn 6 ký tự")
            if (user.password.length <= 1) throw new Error("Mật khẩu phải dài hơn 6 ký tự")
            if (user.lastName.length <= 1) throw new Error("Họ phải dài hơn 1 ký tự")
            if (user.firstName.length <= 1) throw new Error("Tên phải dài hơn 1 ký tự")
            if (user.citizenID.length <= 8) throw new Error("Căn cước công dân phải dài hơn 8 ký tự")
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        hideHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", false);
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
    },
    mounted() {
        this.hideHeaderAndFooter();
        this.checkLogin();
    }
}
</script>

<style>
#login-session {
    overflow: hidden;
    width: 100%;
    height: 1000px;
    background-image: url("../assets/Wallpaper.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#title {
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    font-family: 'Lalezar';
    font-size: 60px;
}

#loginTitle {
    position: relative;
    left: 39%;
}

#login-register-button {
    cursor: pointer;
    text-decoration: underline;
}

#login-register-button:hover {
    color: #0F2C59;
}

#login-register {
    font-family: 'inter';
    font-style: italic;
}

#quote {
    font-family: 'inter';
    font-style: italic;
    font-size: 30px;
}

.login-title {

    color: #FFF0DC;
    position: fixed;
    top: 35%;
    left: 10%;
}

.login-button {
    color: #FFF0DC;
    font-size: 30px;
    border-radius: 50px;
    padding: 15px 30px;
    background-color: #0F2C59;
}

.login-button:hover {
    background-color: #1b3f75;
}
</style>