<template>
<div id="login-session">
    <div class="login-title container align-self-center">
        <p id="title">IStay</p>
        <p id="quote">Find your comfort</p>
        <button type="button" class="login-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Đăng nhập
        </button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title " id="exampleModalLabel">Đăng nhập</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <loginForm/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import loginForm from "../components/LoginForm.vue"    
export default {
    
    data() {
        return {
            
        };
    },
    components: {
        loginForm,
    },
    computed: {

    },
    methods: {

    },
    mounted(){

    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;700&family=Lalezar&display=swap');

#login-session{
  /* height: 100%;
  background-image: url("./assets/Wallpaper.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
}

#title{
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    font-family: 'Lalezar'; 
    font-size: 60px;
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